// Service for tarjeta_bancaria
const TarjetaBancaria = require('../models/tarjeta_bancaria');

class TarjetaBancariaService {
    async findAll() {
        return await TarjetaBancaria.find();
    }

    async findById(id) {
        return await TarjetaBancaria.findById(id);
    }

    async create(data) {
        const tarjetaBancaria = new TarjetaBancaria(data);
        return await tarjetaBancaria.save();
    }

    async update(id, data) {
        return await TarjetaBancaria.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await TarjetaBancaria.findByIdAndDelete(id);
    }
}

module.exports = new TarjetaBancariaService();
