// Controller for vehiculo
const vehiculoService = require('../services/vehiculo');

class VehiculoController {
    async getAll(req, res) {
        try {
            const vehiculos = await vehiculoService.findAll();
            res.json(vehiculos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const vehiculo = await vehiculoService.findById(id);
            if (!vehiculo) {
                return res.status(404).json({ error: 'Vehiculo no encontrado' });
            }
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const vehiculo = await vehiculoService.create(req.body);
            res.status(201).json(vehiculo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const vehiculo = await vehiculoService.update(id, req.body);
            if (!vehiculo) {
                return res.status(404).json({ error: 'Vehiculo no encontrado' });
            }
            res.json(vehiculo);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const vehiculo = await vehiculoService.delete(id);
            if (!vehiculo) {
                return res.status(404).json({ error: 'Vehiculo no encontrado' });
            }
            res.json({ message: 'Vehiculo eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new VehiculoController();
