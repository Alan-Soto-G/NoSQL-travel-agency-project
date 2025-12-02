const mongoose = require('mongoose');

// Model for factura

const facturaSchema = new mongoose.Schema({
    id_cuota: { type: String, required: true },
    numero_factura: { type: String, required: true },
  fecha_emision: { type: Date, required: true },
  total: { type: Number, required: true },
  estado: { type: String, required: true }
});

module.exports = mongoose.model('Factura', facturaSchema, 'facturas');
