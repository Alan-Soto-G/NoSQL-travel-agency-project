// Controller for plan_actividad
const planActividadService = require('../services/plan_actividad');

class PlanActividadController {
    async getAll(req, res) {
        try {
            const planActividades = await planActividadService.findAll();
            res.json(planActividades);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByPlanAndActividad(req, res) {
        try {
            const { id_plan, id_actividad } = req.params;
            const planActividad = await planActividadService.findByPlanAndActividad(id_plan, id_actividad);
            if (!planActividad) {
                return res.status(404).json({ error: 'PlanActividad no encontrado' });
            }
            res.json(planActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const planActividad = await planActividadService.create(req.body);
            res.status(201).json(planActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id_plan, id_actividad } = req.params;
            const planActividad = await planActividadService.update(id_plan, id_actividad, req.body);
            if (!planActividad) {
                return res.status(404).json({ error: 'PlanActividad no encontrado' });
            }
            res.json(planActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id_plan, id_actividad } = req.params;
            const planActividad = await planActividadService.delete(id_plan, id_actividad);
            if (!planActividad) {
                return res.status(404).json({ error: 'PlanActividad no encontrado' });
            }
            res.json({ message: 'PlanActividad eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new PlanActividadController();
