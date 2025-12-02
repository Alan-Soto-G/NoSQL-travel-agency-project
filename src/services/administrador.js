// Service for administrador
const Administrador = require('../models/administrador');

class AdministradorService {
    async findAll() {
        return await Administrador.find();
    }

    async findById(id) {
        return await Administrador.findById(id);
    }

    async create(data) {
        const administrador = new Administrador(data);
        return await administrador.save();
    }

    async update(id, data) {
        return await Administrador.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Administrador.findByIdAndDelete(id);
    }
}

module.exports = new AdministradorService();
