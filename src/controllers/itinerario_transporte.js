// Controller for itinerario_transporte
const itinerarioTransporteService = require('../services/itinerario_transporte');

class ItinerarioTransporteController {
    async getAll(req, res) {
        try {
            const itinerarioTransportes = await itinerarioTransporteService.findAll();
            res.json(itinerarioTransportes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const itinerarioTransporte = await itinerarioTransporteService.findById(id);
            if (!itinerarioTransporte) {
                return res.status(404).json({ error: 'ItinerarioTransporte no encontrado' });
            }
            res.json(itinerarioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const itinerarioTransporte = await itinerarioTransporteService.create(req.body);
            res.status(201).json(itinerarioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const itinerarioTransporte = await itinerarioTransporteService.update(id, req.body);
            if (!itinerarioTransporte) {
                return res.status(404).json({ error: 'ItinerarioTransporte no encontrado' });
            }
            res.json(itinerarioTransporte);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const itinerarioTransporte = await itinerarioTransporteService.delete(id);
            if (!itinerarioTransporte) {
                return res.status(404).json({ error: 'ItinerarioTransporte no encontrado' });
            }
            res.json({ message: 'ItinerarioTransporte eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ItinerarioTransporteController();
