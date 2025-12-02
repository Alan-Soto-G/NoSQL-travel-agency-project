// Controller for guia
const guiaService = require('../services/guia');

class GuiaController {
    async getAll(req, res) {
        try {
            const guias = await guiaService.findAll();
            res.json(guias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const guia = await guiaService.findById(id);
            if (!guia) {
                return res.status(404).json({ error: 'Guia no encontrado' });
            }
            res.json(guia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const guia = await guiaService.create(req.body);
            res.status(201).json(guia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const guia = await guiaService.update(id, req.body);
            if (!guia) {
                return res.status(404).json({ error: 'Guia no encontrado' });
            }
            res.json(guia);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const guia = await guiaService.delete(id);
            if (!guia) {
                return res.status(404).json({ error: 'Guia no encontrado' });
            }
            res.json({ message: 'Guia eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new GuiaController();
