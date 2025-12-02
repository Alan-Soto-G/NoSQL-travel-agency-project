const mongoose = require('mongoose');

// Model for hotel

const hotelSchema = new mongoose.Schema({
  id_administrador: { type: String, required: true },
    nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  categoria: { type: String, required: true },
  municipio_id: { type: String, required: true }
});

module.exports = mongoose.model('Hotel', hotelSchema, 'hoteles');
