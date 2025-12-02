// Controller for actividad_turistica
const actividadTuristicaService = require('../services/actividad_turistica');

class ActividadTuristicaController {
    async getAll(req, res) {
        try {
            const actividadTuristicas = await actividadTuristicaService.findAll();
            res.json(actividadTuristicas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const actividadTuristica = await actividadTuristicaService.findById(id);
            if (!actividadTuristica) {
                return res.status(404).json({ error: 'ActividadTuristica no encontrada' });
            }
            res.json(actividadTuristica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const actividadTuristica = await actividadTuristicaService.create(req.body);
            res.status(201).json(actividadTuristica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const actividadTuristica = await actividadTuristicaService.update(id, req.body);
            if (!actividadTuristica) {
                return res.status(404).json({ error: 'ActividadTuristica no encontrada' });
            }
            res.json(actividadTuristica);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const actividadTuristica = await actividadTuristicaService.delete(id);
            if (!actividadTuristica) {
                return res.status(404).json({ error: 'ActividadTuristica no encontrada' });
            }
            res.json({ message: 'ActividadTuristica eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ActividadTuristicaController();

