// Service for cuota
const Cuota = require('../models/cuota');

class CuotaService {
    async findAll() {
        return await Cuota.find();
    }

    async findById(id) {
        return await Cuota.findById(id);
    }

    async create(data) {
        const cuota = new Cuota(data);
        return await cuota.save();
    }

    async update(id, data) {
        return await Cuota.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Cuota.findByIdAndDelete(id);
    }
}

module.exports = new CuotaService();
