const mongoose = require('mongoose');

// Model for aerolinea

const aerolineaSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    codigo_iata: { type: String, required: true },
    pais_origen: { type: String, required: true }
});

module.exports = mongoose.model('Aerolinea', aerolineaSchema, 'aerolineas');
