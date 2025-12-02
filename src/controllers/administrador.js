// Controller for administrador
const administradorService = require('../services/administrador');

class AdministradorController {
    async getAll(req, res) {
        try {
            const administradores = await administradorService.findAll();
            res.json(administradores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const administrador = await administradorService.findById(id);
            if (!administrador) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json(administrador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const administrador = await administradorService.create(req.body);
            res.status(201).json(administrador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const administrador = await administradorService.update(id, req.body);
            if (!administrador) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json(administrador);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const administrador = await administradorService.delete(id);
            if (!administrador) {
                return res.status(404).json({ error: 'Administrador no encontrado' });
            }
            res.json({ message: 'Administrador eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AdministradorController();
