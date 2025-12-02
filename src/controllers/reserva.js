// Controller for reserva
const reservaService = require('../services/reserva');

class ReservaController {
    async getAll(req, res) {
        try {
            const reservas = await reservaService.findAll();
            res.json(reservas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const reserva = await reservaService.findById(id);
            if (!reserva) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            res.json(reserva);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const reserva = await reservaService.create(req.body);
            res.status(201).json(reserva);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const reserva = await reservaService.update(id, req.body);
            if (!reserva) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            res.json(reserva);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const reserva = await reservaService.delete(id);
            if (!reserva) {
                return res.status(404).json({ error: 'Reserva no encontrada' });
            }
            res.json({ message: 'Reserva eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ReservaController();
