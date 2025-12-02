// Controller for trayecto
const trayectoService = require('../services/trayecto');

class TrayectoController {
    async getAll(req, res) {
        try {
            const trayectos = await trayectoService.findAll();
            res.json(trayectos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const trayecto = await trayectoService.findById(id);
            if (!trayecto) {
                return res.status(404).json({ error: 'Trayecto no encontrado' });
            }
            res.json(trayecto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const trayecto = await trayectoService.create(req.body);
            res.status(201).json(trayecto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const trayecto = await trayectoService.update(id, req.body);
            if (!trayecto) {
                return res.status(404).json({ error: 'Trayecto no encontrado' });
            }
            res.json(trayecto);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const trayecto = await trayectoService.delete(id);
            if (!trayecto) {
                return res.status(404).json({ error: 'Trayecto no encontrado' });
            }
            res.json({ message: 'Trayecto eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TrayectoController();
