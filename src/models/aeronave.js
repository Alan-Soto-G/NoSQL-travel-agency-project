// Model for aeronave

const aeronaveSchema = {
  _id: { type: String, required: true },
  vehiculo_id: { type: String, required: true },
  codigo_aeronave: { type: String, required: true },
  capacidad_pasajeros: { type: Number, required: true },
  id_aerolinea: { type: String, required: false }
};

module.exports = aeronaveSchema;
