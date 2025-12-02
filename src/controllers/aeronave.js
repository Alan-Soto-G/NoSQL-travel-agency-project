// Controller for aeronave
const aeronaveService = require('../services/aeronave');

class AeronaveController {
    async getAll(req, res) {
        try {
            const aeronaves = await aeronaveService.findAll();
            res.json(aeronaves);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const aeronave = await aeronaveService.findById(id);
            if (!aeronave) {
                return res.status(404).json({ error: 'Aeronave no encontrada' });
            }
            res.json(aeronave);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const aeronave = await aeronaveService.create(req.body);
            res.status(201).json(aeronave);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const aeronave = await aeronaveService.update(id, req.body);
            if (!aeronave) {
                return res.status(404).json({ error: 'Aeronave no encontrada' });
            }
            res.json(aeronave);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const aeronave = await aeronaveService.delete(id);
            if (!aeronave) {
                return res.status(404).json({ error: 'Aeronave no encontrada' });
            }
            res.json({ message: 'Aeronave eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AeronaveController();
