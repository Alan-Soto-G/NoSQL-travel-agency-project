// Model for viaje

const viajeSchema = {
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  estado: { type: String, required: true }
};

module.exports = viajeSchema;
