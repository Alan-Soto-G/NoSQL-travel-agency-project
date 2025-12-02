// Model for cliente_viaje

const clienteViajeSchema = {
  _id: { type: String, required: true },
  id_cliente: { type: String, required: true },
  id_viaje: { type: String, required: true },
  estado: { type: String, required: true },
  fecha_participacion: { type: Date, required: true }
};

module.exports = clienteViajeSchema;
