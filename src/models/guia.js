const mongoose = require('mongoose');

const guiaSchema = new mongoose.Schema({
  usuario_id: { type: String, required: true },
  idioma: { type: String, required: true },
  especialidad: { type: String, required: true },
  calificacion_promedio: { type: Number, required: false }
});

module.exports = mongoose.model('Guia', guiaSchema, 'guias');
