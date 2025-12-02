// Model for guia_actividad

const guiaActividadSchema = {
  _id: { type: String, required: true },
  id_guia: { type: String, required: true },
  id_actividad: { type: String, required: true },
  fecha_asignacion: { type: Date, required: true },
  horario: { type: String, required: true }
};

module.exports = guiaActividadSchema;
