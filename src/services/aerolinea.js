// Service for aerolinea
const Aerolinea = require('../models/aerolinea');

class AerolineaService {
    async findAll() {
        return await Aerolinea.find();
    }

    async findById(id) {
        return await Aerolinea.findById(id);
    }

    async create(data) {
        const aerolinea = new Aerolinea(data);
        return await aerolinea.save();
    }

    async update(id, data) {
        return await Aerolinea.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Aerolinea.findByIdAndDelete(id);
    }
}

module.exports = new AerolineaService();
