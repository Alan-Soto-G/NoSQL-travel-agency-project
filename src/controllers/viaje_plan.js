// Controller for viaje_plan
const viajePlanService = require('../services/viaje_plan');

class ViajePlanController {
    async getAll(req, res) {
        try {
            const viajePlanes = await viajePlanService.findAll();
            res.json(viajePlanes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByViajeAndPlan(req, res) {
        try {
            const { id_viaje, id_plan } = req.params;
            const viajePlan = await viajePlanService.findByViajeAndPlan(id_viaje, id_plan);
            if (!viajePlan) {
                return res.status(404).json({ error: 'ViajePlan no encontrado' });
            }
            res.json(viajePlan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const viajePlan = await viajePlanService.create(req.body);
            res.status(201).json(viajePlan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id_viaje, id_plan } = req.params;
            const viajePlan = await viajePlanService.update(id_viaje, id_plan, req.body);
            if (!viajePlan) {
                return res.status(404).json({ error: 'ViajePlan no encontrado' });
            }
            res.json(viajePlan);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id_viaje, id_plan } = req.params;
            const viajePlan = await viajePlanService.delete(id_viaje, id_plan);
            if (!viajePlan) {
                return res.status(404).json({ error: 'ViajePlan no encontrado' });
            }
            res.json({ message: 'ViajePlan eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ViajePlanController();
