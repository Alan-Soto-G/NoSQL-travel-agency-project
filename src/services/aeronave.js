// Service for aeronave
const Aeronave = require('../models/aeronave');

class AeronaveService {
    async findAll() {
        return await Aeronave.find();
    }

    async findById(id) {
        return await Aeronave.findById(id);
    }

    async create(data) {
        const aeronave = new Aeronave(data);
        return await aeronave.save();
    }

    async update(id, data) {
        return await Aeronave.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Aeronave.findByIdAndDelete(id);
    }
}

module.exports = new AeronaveService();
