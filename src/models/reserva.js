const mongoose = require('mongoose');

// Model for reserva

const reservaSchema = new mongoose.Schema({
  id_viaje: { type: String, required: true },
  id_habitacion: { type: String, required: true },
  fecha_check_in: { type: Date, required: true },
  fecha_check_out: { type: Date, required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema, 'reservas');
