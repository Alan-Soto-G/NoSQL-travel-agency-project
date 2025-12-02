// Model for aerolinea

const aerolineaSchema = {
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  codigo_iata: { type: String, required: true },
  pais_origen: { type: String, required: true }
};

module.exports = aerolineaSchema;
