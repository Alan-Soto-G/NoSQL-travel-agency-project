const mongoose = require('mongoose');

const actividadTuristicaSchema = new mongoose.Schema({
    id_municipio: { type: String, required: true },
    nombre: { type: String, required: true },
    descripcion: { type: String, required: false },
    duracion_horas: { type: Number, required: true },
    costo: { type: Number, required: true }
});

module.exports = mongoose.model('ActividadTuristica', actividadTuristicaSchema, 'actividad_turistica');
