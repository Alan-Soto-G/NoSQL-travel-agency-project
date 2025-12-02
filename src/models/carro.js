const mongoose = require('mongoose');

// Model for carro

const carroSchema = new mongoose.Schema({
    vehiculo_id: { type: String, required: true },
    tipo_combustible: { type: String, required: false },
    transmision: { type: String, required: false },
    color: { type: String, required: false },
    kilometraje: { type: Number, required: false }
});

module.exports = mongoose.model('Carro', carroSchema, 'carros');
