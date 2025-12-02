// Service for habitacion
const Habitacion = require('../models/habitacion');

class HabitacionService {
    async findAll() {
        return await Habitacion.find();
    }

    async findById(id) {
        return await Habitacion.findById(id);
    }

    async create(data) {
        const habitacion = new Habitacion(data);
        return await habitacion.save();
    }

    async update(id, data) {
        return await Habitacion.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Habitacion.findByIdAndDelete(id);
    }
}

module.exports = new HabitacionService();
