// Model for factura

const facturaSchema = {
  _id: { type: String, required: true },
    id_cuota: { type: String, required: true },
    numero_factura: { type: String, required: true },
  fecha_emision: { type: Date, required: true },
  total: { type: Number, required: true },
  estado: { type: String, required: true }
};

module.exports = facturaSchema;
