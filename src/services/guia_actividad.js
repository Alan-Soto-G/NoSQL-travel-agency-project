// Service for guia_actividad
const GuiaActividad = require('../models/guia_actividad');

class GuiaActividadService {
    async findAll() {
        return await GuiaActividad.find();
    }

    async findByGuiaAndActividad(id_guia, id_actividad) {
        return await GuiaActividad.findOne({ id_guia, id_actividad });
    }

    async create(data) {
        const guiaActividad = new GuiaActividad(data);
        return await guiaActividad.save();
    }

    async update(id_guia, id_actividad, data) {
        return await GuiaActividad.findOneAndUpdate(
            { id_guia, id_actividad },
            data,
            { new: true }
        );
    }

    async delete(id_guia, id_actividad) {
        return await GuiaActividad.findOneAndDelete({ id_guia, id_actividad });
    }
}

module.exports = new GuiaActividadService();
