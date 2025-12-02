// Controller for aerolinea
const aerolineaService = require('../services/aerolinea');

class AerolineaController {
    async getAll(req, res) {
        try {
            const aerolineas = await aerolineaService.findAll();
            res.json(aerolineas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const aerolinea = await aerolineaService.findById(id);
            if (!aerolinea) {
                return res.status(404).json({ error: 'Aerolinea no encontrada' });
            }
            res.json(aerolinea);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const aerolinea = await aerolineaService.create(req.body);
            res.status(201).json(aerolinea);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const aerolinea = await aerolineaService.update(id, req.body);
            if (!aerolinea) {
                return res.status(404).json({ error: 'Aerolinea no encontrada' });
            }
            res.json(aerolinea);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const aerolinea = await aerolineaService.delete(id);
            if (!aerolinea) {
                return res.status(404).json({ error: 'Aerolinea no encontrada' });
            }
            res.json({ message: 'Aerolinea eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new AerolineaController();
