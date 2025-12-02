// Model for habitacion

const habitacionSchema = {
  _id: { type: String, required: true },
  id_hotel: { type: String, required: true },
    numero: { type: String, required: true },
  tipo: { type: String, required: true },
  precio_noche: { type: Number, required: true },
  capacidad: { type: Number, required: true }
};

module.exports = habitacionSchema;
