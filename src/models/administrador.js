// Model for administrador

const administradorSchema = {
  _id: { type: String, required: true },
  usuario_id: { type: String, required: true },
  cargo: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
};

module.exports = administradorSchema;
