// Controller for plan
const planService = require('../services/plan');

class PlanController {
    async getAll(req, res) {
        try {
            const planes = await planService.findAll();
            res.json(planes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const plan = await planService.findById(id);
            if (!plan) {
                return res.status(404).json({ error: 'Plan no encontrado' });
            }
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const plan = await planService.create(req.body);
            res.status(201).json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const plan = await planService.update(id, req.body);
            if (!plan) {
                return res.status(404).json({ error: 'Plan no encontrado' });
            }
            res.json(plan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const plan = await planService.delete(id);
            if (!plan) {
                return res.status(404).json({ error: 'Plan no encontrado' });
            }
            res.json({ message: 'Plan eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PlanController();
