// Service for cliente
const Cliente = require('../models/cliente');

class ClienteService {
    async findAll() {
        return await Cliente.find();
    }

    async findById(id) {
        return await Cliente.findById(id);
    }

    async create(data) {
        const cliente = new Cliente(data);
        return await cliente.save();
    }

    async update(id, data) {
        return await Cliente.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Cliente.findByIdAndDelete(id);
    }
}

module.exports = new ClienteService();
