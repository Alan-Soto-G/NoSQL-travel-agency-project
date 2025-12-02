const {
  searchImagesByText,
  searchSimilarImages,
  hybridSearch,
} = require("../services/rag/search");
const {
  generateRAGResponse,
  summarizeResults,
} = require("../services/rag/llm");
const {
  uploadImageWithEmbedding,
  deleteImage,
  downloadFromGridFS,
} = require("../services/rag/storage");
const { getRagDB } = require("../config/db");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Configurar multer para subida de archivos
const upload = multer({
  dest: "uploads/temp/",
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|webp/;
    const extname = allowedTypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error("Solo se permiten imágenes (jpeg, jpg, png, webp)"));
  },
});

/**
 * Controlador principal de RAG: búsqueda + respuesta LLM
 */
async function handleRAGQuery(req, res) {
  try {
    const { query, category, tags, k = 5, includeAnswer = true } = req.body;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'El parámetro "query" es requerido',
      });
    }

    console.log(`\n🔍 RAG Query: "${query}"`);
    console.log(
      `📊 Parámetros: k=${k}, category=${category || "todas"}, tags=${
        tags || "todas"
      }`
    );

    // 1. Búsqueda vectorial
    const searchResults = await searchImagesByText(query, {
      k: parseInt(k),
      categoryFilter: category,
      tagFilter: tags,
    });

    if (searchResults.length === 0) {
      return res.json({
        success: true,
        query,
        results: [],
        message: "No se encontraron resultados para tu búsqueda",
      });
    }

    // 2. Generar respuesta con LLM (opcional)
    let ragResponse = null;
    if (includeAnswer) {
      ragResponse = await generateRAGResponse(searchResults, query, {
        maxContext: 6,
      });
    }

    res.json({
      success: true,
      query,
      totalResults: searchResults.length,
      results: searchResults,
      ...(ragResponse && {
        answer: ragResponse.answer,
        context: ragResponse.context,
      }),
    });
  } catch (error) {
    console.error("❌ Error en RAG query:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Búsqueda simple sin LLM
 */
async function handleSearch(req, res) {
  try {
    const { query, category, tags, k = 5 } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        error: 'El parámetro "query" es requerido',
      });
    }

    const results = await searchImagesByText(query, {
      k: parseInt(k),
      categoryFilter: category,
      tagFilter: tags ? tags.split(",") : null,
    });

    res.json({
      success: true,
      query,
      totalResults: results.length,
      results,
    });
  } catch (error) {
    console.error("Error en búsqueda:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Buscar imágenes similares a una existente
 */
async function handleSimilarImages(req, res) {
  try {
    const { mediaId } = req.params;
    const { k = 5 } = req.query;

    const results = await searchSimilarImages(mediaId, {
      k: parseInt(k),
    });

    res.json({
      success: true,
      sourceId: mediaId,
      totalResults: results.length,
      results,
    });
  } catch (error) {
    console.error("Error buscando similares:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Subir una nueva imagen
 */
async function handleUploadImage(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        error: "No se proporcionó ninguna imagen",
      });
    }

    const { title, category, tags, caption, related_entity_id } = req.body;

    if (!title || !category) {
      // Limpiar archivo temporal
      fs.unlinkSync(req.file.path);
      return res.status(400).json({
        success: false,
        error: 'Los campos "title" y "category" son requeridos',
      });
    }

    const metadata = {
      title,
      category,
      tags: tags
        ? Array.isArray(tags)
          ? tags
          : tags.split(",").map((t) => t.trim())
        : [],
      caption,
      related_entity_id,
      contentType: req.file.mimetype,
    };

    const result = await uploadImageWithEmbedding(req.file.path, metadata);

    // Limpiar archivo temporal
    fs.unlinkSync(req.file.path);

    res.json({
      success: true,
      message: "Imagen subida exitosamente",
      ...result,
    });
  } catch (error) {
    // Limpiar archivo temporal en caso de error
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    console.error("Error subiendo imagen:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Obtener imagen por ID
 */
async function handleGetImage(req, res) {
  try {
    const { mediaId } = req.params;
    const db = getRagDB();

    const doc = await db.collection("media").findOne({ _id: mediaId });

    if (!doc) {
      return res.status(404).json({
        success: false,
        error: "Imagen no encontrada",
      });
    }

    // Si se solicita solo metadatos
    if (req.query.metadata === "true") {
      return res.json({
        success: true,
        document: doc,
      });
    }

    // Descargar y enviar imagen
    const imageBuffer = await downloadFromGridFS(doc.image_file_id);

    res.set("Content-Type", doc.metadata?.contentType || "image/jpeg");
    res.send(imageBuffer);
  } catch (error) {
    console.error("Error obteniendo imagen:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Eliminar imagen
 */
async function handleDeleteImage(req, res) {
  try {
    const { mediaId } = req.params;

    await deleteImage(mediaId);

    res.json({
      success: true,
      message: "Imagen eliminada exitosamente",
    });
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Listar todas las imágenes con paginación
 */
async function handleListImages(req, res) {
  try {
    const { page = 1, limit = 20, category, tags } = req.query;

    const db = getRagDB();
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const filter = {};
    if (category) filter.category = category;
    if (tags) filter.tags = { $in: tags.split(",") };

    const [documents, total] = await Promise.all([
      db
        .collection("media")
        .find(filter)
        .sort({ created_at: -1 })
        .skip(skip)
        .limit(parseInt(limit))
        .toArray(),
      db.collection("media").countDocuments(filter),
    ]);

    res.json({
      success: true,
      page: parseInt(page),
      limit: parseInt(limit),
      total,
      totalPages: Math.ceil(total / parseInt(limit)),
      documents,
    });
  } catch (error) {
    console.error("Error listando imágenes:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

/**
 * Generar resumen de categoría
 */
async function handleCategorySummary(req, res) {
  try {
    const { category } = req.params;
    const db = getRagDB();

    const documents = await db
      .collection("media")
      .find({ category })
      .limit(10)
      .toArray();

    if (documents.length === 0) {
      return res.json({
        success: true,
        category,
        summary: `No hay imágenes en la categoría "${category}"`,
      });
    }

    const summary = await summarizeResults(documents);

    res.json({
      success: true,
      category,
      totalImages: documents.length,
      summary,
    });
  } catch (error) {
    console.error("Error generando resumen:", error);
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
}

module.exports = {
  handleRAGQuery,
  handleSearch,
  handleSimilarImages,
  handleUploadImage,
  handleGetImage,
  handleDeleteImage,
  handleListImages,
  handleCategorySummary,
  uploadMiddleware: upload.single("image"),
};
