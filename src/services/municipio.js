// Service for municipio
const Municipio = require('../models/municipio');

class MunicipioService {
    async findAll() {
        return await Municipio.find();
    }

    async findById(id) {
        return await Municipio.findById(id);
    }

    async create(data) {
        const municipio = new Municipio(data);
        return await municipio.save();
    }

    async update(id, data) {
        return await Municipio.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Municipio.findByIdAndDelete(id);
    }
}

module.exports = new MunicipioService();
