// Controller for habitacion
const habitacionService = require('../services/habitacion');

class HabitacionController {
    async getAll(req, res) {
        try {
            const habitaciones = await habitacionService.findAll();
            res.json(habitaciones);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const habitacion = await habitacionService.findById(id);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitacion no encontrada' });
            }
            res.json(habitacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const habitacion = await habitacionService.create(req.body);
            res.status(201).json(habitacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const habitacion = await habitacionService.update(id, req.body);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitacion no encontrada' });
            }
            res.json(habitacion);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const habitacion = await habitacionService.delete(id);
            if (!habitacion) {
                return res.status(404).json({ error: 'Habitacion no encontrada' });
            }
            res.json({ message: 'Habitacion eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new HabitacionController();
