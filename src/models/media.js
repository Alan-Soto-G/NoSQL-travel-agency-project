/**
 * Esquema para medios multimedia (imágenes con embeddings)
 * Usado para búsqueda semántica vectorial con CLIP
 */
const mediaSchema = {
  _id: { type: String, required: true }, // ID único del documento
  title: { type: String, required: true }, // Título descriptivo de la imagen
  category: { type: String, required: true }, // Categoría: 'hotel', 'actividad', 'destino', 'vehiculo', etc.
  tags: { type: Array, default: [] }, // Etiquetas para filtrado: ['playa', 'montaña', 'aventura']
  caption: { type: String, required: false }, // Descripción generada o manual
  image_file_id: { type: String, required: true }, // ObjectId del archivo en GridFS
  image_embedding: { type: Array, required: true }, // Vector de 512 dimensiones (CLIP)
  related_entity_id: { type: String, required: false }, // ID de hotel, actividad, etc.
  metadata: {
    width: { type: Number },
    height: { type: Number },
    format: { type: String },
    size: { type: Number }, // Tamaño en bytes
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
};

/**
 * Valida que un documento cumpla con el esquema
 */
function validateMediaDocument(doc) {
  const errors = [];

  if (!doc.title || typeof doc.title !== "string") {
    errors.push('El campo "title" es requerido y debe ser string');
  }

  if (!doc.category || typeof doc.category !== "string") {
    errors.push('El campo "category" es requerido y debe ser string');
  }

  const validCategories = [
    "hotel",
    "actividad",
    "destino",
    "vehiculo",
    "general",
  ];
  if (doc.category && !validCategories.includes(doc.category)) {
    errors.push(`La categoría debe ser una de: ${validCategories.join(", ")}`);
  }

  if (!doc.image_file_id || typeof doc.image_file_id !== "string") {
    errors.push('El campo "image_file_id" es requerido y debe ser string');
  }

  if (!Array.isArray(doc.image_embedding)) {
    errors.push('El campo "image_embedding" debe ser un array');
  } else if (doc.image_embedding.length !== 512) {
    errors.push("El embedding debe tener exactamente 512 dimensiones");
  }

  if (doc.tags && !Array.isArray(doc.tags)) {
    errors.push('El campo "tags" debe ser un array');
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Crea un documento de media con valores por defecto
 */
function createMediaDocument(data) {
  return {
    title: data.title,
    category: data.category,
    tags: data.tags || [],
    caption: data.caption || null,
    image_file_id: data.image_file_id,
    image_embedding: data.image_embedding,
    related_entity_id: data.related_entity_id || null,
    metadata: data.metadata || {},
    created_at: new Date(),
    updated_at: new Date(),
  };
}

module.exports = {
  mediaSchema,
  validateMediaDocument,
  createMediaDocument,
};
