const mongoose = require('mongoose');

// Model for aeronave

const aeronaveSchema = new mongoose.Schema({
    vehiculo_id: { type: String, required: true },
    codigo_aeronave: { type: String, required: true },
    capacidad_pasajeros: { type: Number, required: true },
    id_aerolinea: { type: String, required: false }
});

module.exports = mongoose.model('Aeronave', aeronaveSchema, 'aeronaves');
