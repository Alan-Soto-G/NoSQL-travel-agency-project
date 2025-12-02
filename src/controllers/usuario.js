// Controller for usuario
const usuarioService = require('../services/usuario');

class UsuarioController {
    async getAll(req, res) {
        try {
            const usuarios = await usuarioService.findAll();
            res.json(usuarios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.findById(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const usuario = await usuarioService.create(req.body);
            res.status(201).json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.update(id, req.body);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(usuario);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const usuario = await usuarioService.delete(id);
            if (!usuario) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json({ message: 'Usuario eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new UsuarioController();

