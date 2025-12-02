const actividadTuristicaSchema = {
  _id: { type: String, required: true },
  id_municipio: { type: String, required: true },
    nombre: { type: String, required: true },
  descripcion: { type: String, required: false },
  duracion_horas: { type: Number, required: true },
  costo: { type: Number, required: true }
};

module.exports = actividadTuristicaSchema;
