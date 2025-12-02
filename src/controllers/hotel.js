// Controller for hotel
const hotelService = require('../services/hotel');

class HotelController {
    async getAll(req, res) {
        try {
            const hoteles = await hotelService.findAll();
            res.json(hoteles);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const hotel = await hotelService.findById(id);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel no encontrado' });
            }
            res.json(hotel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const hotel = await hotelService.create(req.body);
            res.status(201).json(hotel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const hotel = await hotelService.update(id, req.body);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel no encontrado' });
            }
            res.json(hotel);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const hotel = await hotelService.delete(id);
            if (!hotel) {
                return res.status(404).json({ error: 'Hotel no encontrado' });
            }
            res.json({ message: 'Hotel eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new HotelController();
