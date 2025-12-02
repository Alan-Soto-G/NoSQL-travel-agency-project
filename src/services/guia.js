// Service for guia
const Guia = require('../models/guia');

class GuiaService {
    async findAll() {
        return await Guia.find();
    }

    async findById(id) {
        return await Guia.findById(id);
    }

    async create(data) {
        const guia = new Guia(data);
        return await guia.save();
    }

    async update(id, data) {
        return await Guia.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Guia.findByIdAndDelete(id);
    }
}

module.exports = new GuiaService();
