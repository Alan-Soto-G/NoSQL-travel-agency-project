const mongoose = require('mongoose');

// Model for habitacion

const habitacionSchema = new mongoose.Schema({
  id_hotel: { type: String, required: true },
    numero: { type: String, required: true },
  tipo: { type: String, required: true },
  precio_noche: { type: Number, required: true },
  capacidad: { type: Number, required: true }
});

module.exports = mongoose.model('Habitacion', habitacionSchema, 'habitaciones');
