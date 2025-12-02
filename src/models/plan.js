// Model for plan

const planSchema = {
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String, required: false },
  precio_total: { type: Number, required: true }
};

module.exports = planSchema;
