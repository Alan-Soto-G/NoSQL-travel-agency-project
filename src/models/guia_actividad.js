const mongoose = require('mongoose');

// Model for guia_actividad

const guiaActividadSchema = new mongoose.Schema({
  id_guia: { type: String, required: true },
  id_actividad: { type: String, required: true },
  fecha_asignacion: { type: Date, required: true },
  horario: { type: String, required: true }
});

module.exports = mongoose.model('GuiaActividad', guiaActividadSchema, 'guia_actividad');
