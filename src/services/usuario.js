// Service for usuario
const Usuario = require('../models/usuario');

class UsuarioService {
    async findAll() {
        return await Usuario.find();
    }

    async findById(id) {
        return await Usuario.findById(id);
    }

    async create(data) {
        const usuario = new Usuario(data);
        return await usuario.save();
    }

    async update(id, data) {
        return await Usuario.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Usuario.findByIdAndDelete(id);
    }
}

module.exports = new UsuarioService();

