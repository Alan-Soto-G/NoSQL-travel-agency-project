const { getRagDB } = require("../../config/db");
const axios = require("axios");

const CLIP_SERVICE_URL =
  process.env.CLIP_SERVICE_URL || "http://127.0.0.1:5000";
const SEARCH_INDEX_NAME = process.env.VECTOR_INDEX_NAME || "vector_index";

/**
 * Verifica que el servicio CLIP esté disponible
 */
async function checkClipServiceHealth(maxRetries = 3, delayMs = 1000) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      const response = await axios.get(`${CLIP_SERVICE_URL}/health`, {
        timeout: 5000,
      });
      if (response.data.status === "healthy") {
        return true;
      }
    } catch (error) {
      if (i < maxRetries - 1) {
        console.log(
          `⚠️  Servicio CLIP no responde, reintentando (${
            i + 1
          }/${maxRetries})...`
        );
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }
    }
  }
  return false;
}

/**
 * Genera embedding de texto usando el servicio CLIP
 */
async function generateTextEmbedding(text, retries = 2) {
  // Verificar que el servicio esté disponible antes de intentar
  const isHealthy = await checkClipServiceHealth(3, 1000);
  if (!isHealthy) {
    throw new Error(
      "Servicio CLIP no disponible. Asegúrate de que esté corriendo en " +
        CLIP_SERVICE_URL
    );
  }

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await axios.post(
        `${CLIP_SERVICE_URL}/embed/text`,
        { text },
        {
          headers: { "Content-Type": "application/json" },
          timeout: 30000,
        }
      );

      return response.data.embedding;
    } catch (error) {
      if (attempt < retries) {
        console.log(`⚠️  Error en intento ${attempt + 1}, reintentando...`);
        await new Promise((resolve) => setTimeout(resolve, 1000));
        continue;
      }

      if (error.code === "ECONNREFUSED") {
        throw new Error(
          "Servicio CLIP no disponible. Asegúrate de que esté corriendo en " +
            CLIP_SERVICE_URL
        );
      }
      throw new Error(`Error generando embedding de texto: ${error.message}`);
    }
  }
}

/**
 * Busca imágenes por texto usando búsqueda vectorial
 * Usa $vectorSearch de MongoDB Atlas
 */
async function searchImagesByText(queryText, options = {}) {
  try {
    const {
      k = 5,
      categoryFilter = null,
      tagFilter = null,
      relatedEntityId = null,
    } = options;

    const db = getRagDB();

    console.log(`🔍 Buscando: "${queryText}" (top ${k} resultados)`);

    // 1. Generar embedding del texto de consulta
    const queryEmbedding = await generateTextEmbedding(queryText);

    if (!queryEmbedding || queryEmbedding.length !== 512) {
      throw new Error("Embedding de consulta inválido");
    }

    // 2. Construir pipeline de agregación con $vectorSearch
    const pipeline = [
      {
        $vectorSearch: {
          index: SEARCH_INDEX_NAME,
          path: "image_embedding",
          queryVector: queryEmbedding,
          numCandidates: Math.max(200, k * 10), // Candidatos a evaluar
          limit: k * 2, // Traer más para luego filtrar
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
    ];

    // 3. Aplicar filtros post-búsqueda (más eficiente que pre-filtrar)
    const matchFilters = {};

    if (categoryFilter) {
      matchFilters.category = categoryFilter;
    }

    if (tagFilter) {
      matchFilters.tags = {
        $in: Array.isArray(tagFilter) ? tagFilter : [tagFilter],
      };
    }

    if (relatedEntityId) {
      matchFilters.related_entity_id = relatedEntityId;
    }

    if (Object.keys(matchFilters).length > 0) {
      pipeline.push({ $match: matchFilters });
    }

    // 4. Limitar resultados finales
    pipeline.push({ $limit: k });

    // 5. Proyección de campos
    pipeline.push({
      $project: {
        title: 1,
        category: 1,
        tags: 1,
        caption: 1,
        image_file_id: 1,
        related_entity_id: 1,
        score: 1,
        metadata: 1,
        created_at: 1,
      },
    });

    // 6. Ejecutar búsqueda
    const results = await db.collection("media").aggregate(pipeline).toArray();

    console.log(`✅ Encontrados ${results.length} resultados`);

    return results;
  } catch (error) {
    console.error("❌ Error en búsqueda vectorial:", error.message);
    throw error;
  }
}

/**
 * Busca imágenes similares a una imagen dada (búsqueda por imagen)
 */
async function searchSimilarImages(mediaId, options = {}) {
  try {
    const { k = 5 } = options;
    const db = getRagDB();

    // Obtener el embedding de la imagen original
    const sourceDoc = await db.collection("media").findOne({ _id: mediaId });

    if (!sourceDoc) {
      throw new Error("Imagen fuente no encontrada");
    }

    const queryEmbedding = sourceDoc.image_embedding;

    // Buscar imágenes similares (excluyendo la original)
    const pipeline = [
      {
        $vectorSearch: {
          index: SEARCH_INDEX_NAME,
          path: "image_embedding",
          queryVector: queryEmbedding,
          numCandidates: 200,
          limit: k + 1, // +1 porque la original aparecerá
        },
      },
      {
        $addFields: {
          score: { $meta: "vectorSearchScore" },
        },
      },
      {
        $match: {
          _id: { $ne: mediaId }, // Excluir la imagen original
        },
      },
      {
        $limit: k,
      },
      {
        $project: {
          title: 1,
          category: 1,
          tags: 1,
          caption: 1,
          image_file_id: 1,
          score: 1,
        },
      },
    ];

    const results = await db.collection("media").aggregate(pipeline).toArray();

    return results;
  } catch (error) {
    console.error("Error buscando imágenes similares:", error);
    throw error;
  }
}

/**
 * Búsqueda híbrida: combina filtros tradicionales con búsqueda vectorial
 */
async function hybridSearch(queryText, filters = {}, options = {}) {
  try {
    const { k = 5, boost = 1.0 } = options;

    // Búsqueda vectorial con filtros
    const vectorResults = await searchImagesByText(queryText, {
      k: k * 2,
      ...filters,
    });

    // Aquí podrías agregar lógica adicional de ranking
    // Por ejemplo, boost por fecha, popularidad, etc.

    return vectorResults.slice(0, k);
  } catch (error) {
    console.error("Error en búsqueda híbrida:", error);
    throw error;
  }
}

/**
 * Búsqueda por múltiples criterios (OR entre textos)
 */
async function multiQuerySearch(queries, options = {}) {
  try {
    const allResults = [];
    const seenIds = new Set();

    for (const query of queries) {
      const results = await searchImagesByText(query, options);

      for (const result of results) {
        const id = result._id.toString();
        if (!seenIds.has(id)) {
          seenIds.add(id);
          allResults.push(result);
        }
      }
    }

    // Ordenar por score descendente
    allResults.sort((a, b) => (b.score || 0) - (a.score || 0));

    return allResults.slice(0, options.k || 10);
  } catch (error) {
    console.error("Error en búsqueda multi-query:", error);
    throw error;
  }
}

module.exports = {
  generateTextEmbedding,
  searchImagesByText,
  searchSimilarImages,
  hybridSearch,
  multiQuerySearch,
};
