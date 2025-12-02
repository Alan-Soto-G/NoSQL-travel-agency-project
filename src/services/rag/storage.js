const { getDB, getGridFS } = require("../../config/mongodb-atlas");
const {
  createMediaDocument,
  validateMediaDocument,
} = require("../../models/media");
const axios = require("axios");
const FormData = require("form-data");
const fs = require("fs");
const path = require("path");
const { Readable } = require("stream");

const CLIP_SERVICE_URL =
  process.env.CLIP_SERVICE_URL || "http://localhost:5000";

/**
 * Genera embedding de una imagen usando el servicio CLIP
 */
async function generateImageEmbedding(imagePath) {
  try {
    const formData = new FormData();
    formData.append("image", fs.createReadStream(imagePath));

    const response = await axios.post(
      `${CLIP_SERVICE_URL}/embed/image`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 30000, // 30 segundos
      }
    );

    return response.data.embedding;
  } catch (error) {
    if (error.code === "ECONNREFUSED") {
      throw new Error(
        "Servicio CLIP no disponible. Asegúrate de que esté corriendo en " +
          CLIP_SERVICE_URL
      );
    }
    throw new Error(`Error generando embedding: ${error.message}`);
  }
}

/**
 * Sube una imagen a GridFS
 */
async function uploadToGridFS(imagePath, filename, metadata = {}) {
  return new Promise((resolve, reject) => {
    const gridFS = getGridFS();

    const uploadStream = gridFS.openUploadStream(filename, {
      metadata: {
        contentType: metadata.contentType || "image/jpeg",
        ...metadata,
      },
    });

    fs.createReadStream(imagePath)
      .pipe(uploadStream)
      .on("error", reject)
      .on("finish", () => {
        resolve(uploadStream.id.toString());
      });
  });
}

/**
 * Descarga una imagen desde GridFS
 */
async function downloadFromGridFS(fileId) {
  return new Promise((resolve, reject) => {
    const gridFS = getGridFS();
    const ObjectId = require("mongodb").ObjectId;

    const chunks = [];
    const downloadStream = gridFS.openDownloadStream(new ObjectId(fileId));

    downloadStream.on("data", (chunk) => chunks.push(chunk));
    downloadStream.on("error", reject);
    downloadStream.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });
}

/**
 * Sube una imagen con su embedding y metadatos
 */
async function uploadImageWithEmbedding(imagePath, metadata) {
  try {
    // Validar que el archivo existe
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Archivo no encontrado: ${imagePath}`);
    }

    // Obtener info del archivo
    const stats = fs.statSync(imagePath);
    const filename = metadata.title || path.basename(imagePath);

    console.log(`📤 Procesando imagen: ${filename}`);

    // 1. Generar embedding (llamada a servicio Python)
    console.log("🧠 Generando embedding...");
    const embedding = await generateImageEmbedding(imagePath);

    if (!embedding || embedding.length !== 512) {
      throw new Error("Embedding inválido (debe tener 512 dimensiones)");
    }

    // 2. Subir a GridFS
    console.log("📦 Subiendo a GridFS...");
    const fileId = await uploadToGridFS(imagePath, filename, {
      contentType: metadata.contentType || "image/jpeg",
      size: stats.size,
    });

    // 3. Crear documento de metadatos
    const mediaDoc = createMediaDocument({
      title: metadata.title || filename,
      category: metadata.category || "general",
      tags: metadata.tags || [],
      caption: metadata.caption || null,
      image_file_id: fileId,
      image_embedding: embedding,
      related_entity_id: metadata.related_entity_id || null,
      metadata: {
        size: stats.size,
        format: path.extname(imagePath).slice(1),
        ...metadata.imageMetadata,
      },
    });

    // Validar documento
    const validation = validateMediaDocument(mediaDoc);
    if (!validation.isValid) {
      throw new Error(`Documento inválido: ${validation.errors.join(", ")}`);
    }

    // 4. Guardar en colección 'media'
    const db = getDB();
    const result = await db.collection("media").insertOne(mediaDoc);

    console.log(`✅ Imagen subida exitosamente (ID: ${result.insertedId})`);

    return {
      success: true,
      mediaId: result.insertedId,
      fileId,
      document: mediaDoc,
    };
  } catch (error) {
    console.error("❌ Error en uploadImageWithEmbedding:", error.message);
    throw error;
  }
}

/**
 * Actualiza una imagen existente
 */
async function updateMediaDocument(mediaId, updates) {
  try {
    const db = getDB();

    const updateDoc = {
      ...updates,
      updated_at: new Date(),
    };

    // No permitir actualizar el embedding o file_id directamente
    delete updateDoc.image_embedding;
    delete updateDoc.image_file_id;

    const result = await db
      .collection("media")
      .updateOne({ _id: mediaId }, { $set: updateDoc });

    return {
      success: result.modifiedCount > 0,
      modifiedCount: result.modifiedCount,
    };
  } catch (error) {
    console.error("Error actualizando documento:", error);
    throw error;
  }
}

/**
 * Elimina una imagen (documento + archivo en GridFS)
 */
async function deleteImage(mediaId) {
  try {
    const db = getDB();
    const gridFS = getGridFS();
    const ObjectId = require("mongodb").ObjectId;

    // Obtener documento
    const doc = await db.collection("media").findOne({ _id: mediaId });
    if (!doc) {
      throw new Error("Documento no encontrado");
    }

    // Eliminar archivo de GridFS
    if (doc.image_file_id) {
      try {
        await gridFS.delete(new ObjectId(doc.image_file_id));
      } catch (error) {
        console.warn(
          "Advertencia al eliminar archivo de GridFS:",
          error.message
        );
      }
    }

    // Eliminar documento
    await db.collection("media").deleteOne({ _id: mediaId });

    return { success: true };
  } catch (error) {
    console.error("Error eliminando imagen:", error);
    throw error;
  }
}

module.exports = {
  generateImageEmbedding,
  uploadToGridFS,
  downloadFromGridFS,
  uploadImageWithEmbedding,
  updateMediaDocument,
  deleteImage,
};
