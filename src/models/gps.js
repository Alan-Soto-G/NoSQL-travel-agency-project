const mongoose = require('mongoose');

const gpsSchema = new mongoose.Schema({
  latitud: { type: Number, required: true },
  longitud: { type: Number, required: true },
  ultima_actualizacion: { type: Date, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Gps', gpsSchema, 'gps');
