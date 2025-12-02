const mongoose = require('mongoose');

// Model for cliente

const clienteSchema = new mongoose.Schema({
    usuario_id: { type: String, required: true },
    es_vip: { type: Boolean, default: false },
    puntos_fidelidad: { type: Number, default: 0 },
    nivel_membresia: { type: String, default: 'basico' }
});

module.exports = mongoose.model('Cliente', clienteSchema, 'clientes');
