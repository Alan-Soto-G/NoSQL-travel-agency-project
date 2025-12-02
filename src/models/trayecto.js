const mongoose = require('mongoose');

// Model for trayecto

const trayectoSchema = new mongoose.Schema({
  origen: { type: String, required: true },
  destino: { type: String, required: true },
  distancia_km: { type: Number, required: true }
});

module.exports = mongoose.model('Trayecto', trayectoSchema, 'trayectos');
