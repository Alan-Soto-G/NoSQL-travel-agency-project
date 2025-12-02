// Model for reserva

const reservaSchema = {
  _id: { type: String, required: true },
  id_viaje: { type: String, required: true },
  id_habitacion: { type: String, required: true },
  fecha_check_in: { type: Date, required: true },
  fecha_check_out: { type: Date, required: true }
};

module.exports = reservaSchema;
