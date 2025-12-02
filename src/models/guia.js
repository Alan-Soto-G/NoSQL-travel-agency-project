// Model for guia

const guiaSchema = {
  _id: { type: String, required: true },
  usuario_id: { type: String, required: true },
  idioma: { type: String, required: true },
  especialidad: { type: String, required: true },
  calificacion_promedio: { type: Number, required: false }
};

module.exports = guiaSchema;
