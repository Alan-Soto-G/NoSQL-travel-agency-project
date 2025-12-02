// Model for plan_actividad

const planActividadSchema = {
  _id: { type: String, required: true },
  id_plan: { type: String, required: true },
  id_actividad: { type: String, required: true },
};

module.exports = planActividadSchema;
