const mongoose = require('mongoose');

const itinerarioTransporteSchema = new mongoose.Schema({
  fecha_salida: { type: Date, required: true },
  fecha_llegada: { type: Date, required: true },
  id_trayecto: { type: String, required: false },
    id_viaje: { type: String, required: true },
    id_servicio_transporte: { type: String, required: true }
});

module.exports = mongoose.model('ItinerarioTransporte', itinerarioTransporteSchema, 'itinerario_transporte');
