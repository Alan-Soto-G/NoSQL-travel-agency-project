const express = require("express");
const router = express.Router();
const {
  handleRAGQuery,
  handleSearch,
  handleSimilarImages,
  handleUploadImage,
  handleGetImage,
  handleDeleteImage,
  handleListImages,
  handleCategorySummary,
  uploadMiddleware,
} = require("../controllers/rag");

/**
 * @route   POST /api/rag/query
 * @desc    Consulta RAG completa: búsqueda vectorial + respuesta LLM
 * @access  Public
 * @body    { query: string, category?: string, tags?: string[], k?: number, includeAnswer?: boolean }
 */
router.post("/query", handleRAGQuery);

/**
 * @route   GET /api/rag/search
 * @desc    Búsqueda vectorial simple (sin LLM)
 * @access  Public
 * @query   query, category, tags (comma-separated), k
 */
router.get("/search", handleSearch);

/**
 * @route   GET /api/rag/similar/:mediaId
 * @desc    Buscar imágenes similares a una existente
 * @access  Public
 * @params  mediaId
 * @query   k (número de resultados)
 */
router.get("/similar/:mediaId", handleSimilarImages);

/**
 * @route   POST /api/rag/upload
 * @desc    Subir una nueva imagen con embeddings
 * @access  Public
 * @body    FormData con: image (file), title, category, tags, caption, related_entity_id
 */
router.post("/upload", uploadMiddleware, handleUploadImage);

/**
 * @route   GET /api/rag/image/:mediaId
 * @desc    Obtener imagen por ID (binario o metadatos)
 * @access  Public
 * @params  mediaId
 * @query   metadata=true (solo metadatos)
 */
router.get("/image/:mediaId", handleGetImage);

/**
 * @route   DELETE /api/rag/image/:mediaId
 * @desc    Eliminar imagen y sus metadatos
 * @access  Public
 * @params  mediaId
 */
router.delete("/image/:mediaId", handleDeleteImage);

/**
 * @route   GET /api/rag/images
 * @desc    Listar imágenes con paginación y filtros
 * @access  Public
 * @query   page, limit, category, tags (comma-separated)
 */
router.get("/images", handleListImages);

/**
 * @route   GET /api/rag/summary/:category
 * @desc    Generar resumen de una categoría usando LLM
 * @access  Public
 * @params  category
 */
router.get("/summary/:category", handleCategorySummary);

module.exports = router;
