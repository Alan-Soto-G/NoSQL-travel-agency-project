const mongoose = require('mongoose');

// Model for plan

const planSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, required: true },
  descripcion: { type: String, required: false },
  precio_total: { type: Number, required: true }
});

module.exports = mongoose.model('Plan', planSchema, 'planes');
