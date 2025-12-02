// Controller for viaje
const viajeService = require('../services/viaje');

class ViajeController {
    async getAll(req, res) {
        try {
            const viajes = await viajeService.findAll();
            res.json(viajes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const viaje = await viajeService.findById(id);
            if (!viaje) {
                return res.status(404).json({ error: 'Viaje no encontrado' });
            }
            res.json(viaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const viaje = await viajeService.create(req.body);
            res.status(201).json(viaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const viaje = await viajeService.update(id, req.body);
            if (!viaje) {
                return res.status(404).json({ error: 'Viaje no encontrado' });
            }
            res.json(viaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const viaje = await viajeService.delete(id);
            if (!viaje) {
                return res.status(404).json({ error: 'Viaje no encontrado' });
            }
            res.json({ message: 'Viaje eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ViajeController();
