// Model for itinerario_transporte

const itinerarioTransporteSchema = {
  _id: { type: String, required: true },
  fecha_salida: { type: Date, required: true },
  fecha_llegada: { type: Date, required: true },
  id_trayecto: { type: String, required: false },
    id_viaje: { type: String, required: true },
    id_servicio_transporte: { type: String, required: true }
};

module.exports = itinerarioTransporteSchema;
