const mongoose = require('mongoose');

// Model for plan_actividad

const planActividadSchema = new mongoose.Schema({
  id_plan: { type: String, required: true },
  id_actividad: { type: String, required: true },
});

module.exports = mongoose.model('PlanActividad', planActividadSchema, 'plan_actividad');
