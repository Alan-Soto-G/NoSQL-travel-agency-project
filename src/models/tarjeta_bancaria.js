// Model for tarjeta_bancaria

const tarjetaBancariaSchema = {
  _id: { type: String, required: true },
  id_cliente: { type: String, required: true },
    tipo: { type: String, required: true },
  numero_enmascarado: { type: String, required: true },
  nombre_titular: { type: String, required: true },
  fecha_vencimiento: { type: Date, required: true }
};

module.exports = tarjetaBancariaSchema;
