// Model for viaje_plan
// Model for actividad_turistica

const viajePlanSchema = {
  _id: { type: String, required: true },
  id_viaje: { type: String, required: true },
  id_plan: { type: String, required: true },
  fecha_asignacion: { type: Date, required: true },
  cantidad_personas: { type: Number, required: true }
};

module.exports = viajePlanSchema;
