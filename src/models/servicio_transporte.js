// Model for servicio_transporte

const servicioTransporteSchema = {
  _id: { type: String, required: true },
  fecha_inicio: { type: Date, required: true },
  fecha_fin: { type: Date, required: true },
  costo: { type: Number, required: true },
  estado: { type: String, required: true },
    id_vehículo: { type: String, required: true },
    id_trayecto: { type: String, required: true }
};

module.exports = servicioTransporteSchema;
