// Model for cliente

const clienteSchema = {
  _id: { type: String, required: true },
  usuario_id: { type: String, required: true },
  es_vip: { type: Boolean, default: false },
  puntos_fidelidad: { type: Number, default: 0 },
  nivel_membresia: { type: String, default: 'basico' }
};

module.exports = clienteSchema;
