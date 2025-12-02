const mongoose = require('mongoose');

// Model for municipio

const municipioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  departamento: { type: String, required: true },
  pais: { type: String, required: true },
  descripcion_turistica: { type: String, required: false }
});

module.exports = mongoose.model('Municipio', municipioSchema, 'municipios');
