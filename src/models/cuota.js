// Model for cuota

const cuotaSchema = {
  _id: { type: String, required: true },
    id_viaje: { type: String, required: true },
  numero_cuota: { type: Number, required: true },
  fecha_pago: { type: Date, required: true },
  monto: { type: Number, required: true },
  estado: { type: String, required: true }
};

module.exports = cuotaSchema;
