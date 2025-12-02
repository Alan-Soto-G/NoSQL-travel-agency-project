// Service for actividad_turistica
const ActividadTuristica = require('../models/actividad_turistica');

class ActividadTuristicaService {
    async findAll() {
        return await ActividadTuristica.find();
    }

    async findById(id) {
        return await ActividadTuristica.findById(id);
    }

    async create(data) {
        const actividadTuristica = new ActividadTuristica(data);
        return await actividadTuristica.save();
    }

    async update(id, data) {
        return await ActividadTuristica.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ActividadTuristica.findByIdAndDelete(id);
    }
}

module.exports = new ActividadTuristicaService();
