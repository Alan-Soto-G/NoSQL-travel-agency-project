const mongoose = require('mongoose');

const viajePlanSchema = new mongoose.Schema({
  id_viaje: { type: String, required: true },
  id_plan: { type: String, required: true },
  fecha_asignacion: { type: Date, required: true },
  cantidad_personas: { type: Number, required: true }
});

module.exports = mongoose.model('ViajePlan', viajePlanSchema, 'viaje_plan');
