const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true },
    roles: [{ type: String, required: true }],
});

module.exports = mongoose.model('Usuario', usuarioSchema, 'usuarios');
