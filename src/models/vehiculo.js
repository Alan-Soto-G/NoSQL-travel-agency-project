// Model for vehiculo

const vehiculoSchema = {
  _id: { type: String, required: true },
  tipo: { type: String, required: true },
  placa: { type: String, required: true },
  modelo: { type: String, required: true },
  capacidad: { type: Number, required: true }
};

module.exports = vehiculoSchema;
