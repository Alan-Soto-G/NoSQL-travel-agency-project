const mongoose = require('mongoose');

// Model for viaje

const viajeSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Viaje', viajeSchema, 'viajes');
