// Service for carro
const Carro = require('../models/carro');

class CarroService {
    async findAll() {
        return await Carro.find();
    }

    async findById(id) {
        return await Carro.findById(id);
    }

    async create(data) {
        const carro = new Carro(data);
        return await carro.save();
    }

    async update(id, data) {
        return await Carro.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Carro.findByIdAndDelete(id);
    }
}

module.exports = new CarroService();
