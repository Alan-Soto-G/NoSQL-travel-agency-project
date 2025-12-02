// Model for gps

const gpsSchema = {
  _id: { type: String, required: true },
  latitud: { type: Number, required: true },
  longitud: { type: Number, required: true },
  ultima_actualizacion: { type: Date, required: true },
  estado: { type: String, required: true }
};

module.exports = vehiculoGpsSchema;
