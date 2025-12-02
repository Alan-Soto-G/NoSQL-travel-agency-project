const mongoose = require('mongoose');

const clienteViajeSchema = new mongoose.Schema({
    id_cliente: { type: String, required: true },
    id_viaje: { type: String, required: true },
    estado: { type: String, required: true },
    fecha_participacion: { type: Date, required: true }
});

// Esto crea el modelo basado en el esquema
module.exports = mongoose.model('ClienteViaje', clienteViajeSchema, 'cliente_viaje');
