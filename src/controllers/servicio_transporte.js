// Controller for servicio_transporte
const servicioTransporteService = require('../services/servicio_transporte');

class ServicioTransporteController {
    async getAll(req, res) {
        try {
            const servicioTransportes = await servicioTransporteService.findAll();
            res.json(servicioTransportes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const servicioTransporte = await servicioTransporteService.findById(id);
            if (!servicioTransporte) {
                return res.status(404).json({ error: 'ServicioTransporte no encontrado' });
            }
            res.json(servicioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const servicioTransporte = await servicioTransporteService.create(req.body);
            res.status(201).json(servicioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const servicioTransporte = await servicioTransporteService.update(id, req.body);
            if (!servicioTransporte) {
                return res.status(404).json({ error: 'ServicioTransporte no encontrado' });
            }
            res.json(servicioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const servicioTransporte = await servicioTransporteService.delete(id);
            if (!servicioTransporte) {
                return res.status(404).json({ error: 'ServicioTransporte no encontrado' });
            }
            res.json({ message: 'ServicioTransporte eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ServicioTransporteController();
