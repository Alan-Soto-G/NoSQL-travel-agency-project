// Service for viaje
const Viaje = require('../models/viaje');

class ViajeService {
    async findAll() {
        return await Viaje.find();
    }

    async findById(id) {
        return await Viaje.findById(id);
    }

    async create(data) {
        const viaje = new Viaje(data);
        return await viaje.save();
    }

    async update(id, data) {
        return await Viaje.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Viaje.findByIdAndDelete(id);
    }
}

module.exports = new ViajeService();
