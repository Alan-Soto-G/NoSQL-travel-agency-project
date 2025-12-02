const mongoose = require('mongoose');

// Model for administrador

const administradorSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true },
    cargo: { type: String, required: true },
    fecha_inicio: { type: Date, required: true },
});

module.exports = mongoose.model('Administrador', administradorSchema, 'administradores');
