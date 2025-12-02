// Model for municipio

const municipioSchema = {
  _id: { type: String, required: true },
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  pais: { type: String, required: true },
  descripcion_turistica: { type: String, required: false }
};

module.exports = municipioSchema;
