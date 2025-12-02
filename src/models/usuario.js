const usuarioSchema = {
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
    roles: [{ type: String, required: true }],
};

module.exports = usuarioSchema;

