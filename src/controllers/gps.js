// Controller for gps
const gpsService = require('../services/gps');

class GpsController {
    async getAll(req, res) {
        try {
            const gpsDevices = await gpsService.findAll();
            res.json(gpsDevices);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const gps = await gpsService.findById(id);
            if (!gps) {
                return res.status(404).json({ error: 'GPS no encontrado' });
            }
            res.json(gps);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const gps = await gpsService.create(req.body);
            res.status(201).json(gps);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const gps = await gpsService.update(id, req.body);
            if (!gps) {
                return res.status(404).json({ error: 'GPS no encontrado' });
            }
            res.json(gps);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const gps = await gpsService.delete(id);
            if (!gps) {
                return res.status(404).json({ error: 'GPS no encontrado' });
            }
            res.json({ message: 'GPS eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new GpsController();

