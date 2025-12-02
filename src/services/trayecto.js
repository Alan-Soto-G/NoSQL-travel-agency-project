// Service for trayecto
const Trayecto = require('../models/trayecto');

class TrayectoService {
    async findAll() {
        return await Trayecto.find();
    }

    async findById(id) {
        return await Trayecto.findById(id);
    }

    async create(data) {
        const trayecto = new Trayecto(data);
        return await trayecto.save();
    }

    async update(id, data) {
        return await Trayecto.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Trayecto.findByIdAndDelete(id);
    }
}

module.exports = new TrayectoService();
