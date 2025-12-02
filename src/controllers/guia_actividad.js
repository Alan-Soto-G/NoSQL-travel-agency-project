// Controller for guia_actividad
const guiaActividadService = require('../services/guia_actividad');

class GuiaActividadController {
    async getAll(req, res) {
        try {
            const guiaActividades = await guiaActividadService.findAll();
            res.json(guiaActividades);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByGuiaAndActividad(req, res) {
        try {
            const { id_guia, id_actividad } = req.params;
            const guiaActividad = await guiaActividadService.findByGuiaAndActividad(id_guia, id_actividad);
            if (!guiaActividad) {
                return res.status(404).json({ error: 'GuiaActividad no encontrado' });
            }
            res.json(guiaActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const guiaActividad = await guiaActividadService.create(req.body);
            res.status(201).json(guiaActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id_guia, id_actividad } = req.params;
            const guiaActividad = await guiaActividadService.update(id_guia, id_actividad, req.body);
            if (!guiaActividad) {
                return res.status(404).json({ error: 'GuiaActividad no encontrado' });
            }
            res.json(guiaActividad);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id_guia, id_actividad } = req.params;
            const guiaActividad = await guiaActividadService.delete(id_guia, id_actividad);
            if (!guiaActividad) {
                return res.status(404).json({ error: 'GuiaActividad no encontrado' });
            }
            res.json({ message: 'GuiaActividad eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new GuiaActividadController();
