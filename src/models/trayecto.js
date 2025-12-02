// Model for trayecto

const trayectoSchema = {
  _id: { type: String, required: true },
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  distancia_km: { type: Number, required: true }
};

module.exports = trayectoSchema;
