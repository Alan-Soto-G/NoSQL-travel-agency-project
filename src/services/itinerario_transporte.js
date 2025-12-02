// Service for itinerario_transporte
const ItinerarioTransporte = require('../models/itinerario_transporte');

class ItinerarioTransporteService {
    async findAll() {
        return await ItinerarioTransporte.find();
    }

    async findById(id) {
        return await ItinerarioTransporte.findById(id);
    }

    async create(data) {
        const itinerarioTransporte = new ItinerarioTransporte(data);
        return await itinerarioTransporte.save();
    }

    async update(id, data) {
        return await ItinerarioTransporte.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ItinerarioTransporte.findByIdAndDelete(id);
    }
}

module.exports = new ItinerarioTransporteService();
