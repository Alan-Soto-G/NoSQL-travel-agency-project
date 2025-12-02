const mongoose = require('mongoose');

// Model for vehiculo

const vehiculoSchema = new mongoose.Schema({
  tipo: { type: String, required: true },
  placa: { type: String, required: true },
  modelo: { type: String, required: true },
  capacidad: { type: Number, required: true }
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema, 'vehiculos');
