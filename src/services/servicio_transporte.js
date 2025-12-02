// Service for servicio_transporte
const ServicioTransporte = require('../models/servicio_transporte');

class ServicioTransporteService {
    async findAll() {
        return await ServicioTransporte.find();
    }

    async findById(id) {
        return await ServicioTransporte.findById(id);
    }

    async create(data) {
        const servicioTransporte = new ServicioTransporte(data);
        return await servicioTransporte.save();
    }

    async update(id, data) {
        return await ServicioTransporte.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await ServicioTransporte.findByIdAndDelete(id);
    }
}

module.exports = new ServicioTransporteService();
