// Controller for cuota
const cuotaService = require('../services/cuota');

class CuotaController {
    async getAll(req, res) {
        try {
            const cuotas = await cuotaService.findAll();
            res.json(cuotas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const cuota = await cuotaService.findById(id);
            if (!cuota) {
                return res.status(404).json({ error: 'Cuota no encontrada' });
            }
            res.json(cuota);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const cuota = await cuotaService.create(req.body);
            res.status(201).json(cuota);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const cuota = await cuotaService.update(id, req.body);
            if (!cuota) {
                return res.status(404).json({ error: 'Cuota no encontrada' });
            }
            res.json(cuota);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const cuota = await cuotaService.delete(id);
            if (!cuota) {
                return res.status(404).json({ error: 'Cuota no encontrada' });
            }
            res.json({ message: 'Cuota eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CuotaController();
