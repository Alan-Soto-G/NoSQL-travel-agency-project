// Service for factura
const Factura = require('../models/factura');

class FacturaService {
    async findAll() {
        return await Factura.find();
    }

    async findById(id) {
        return await Factura.findById(id);
    }

    async create(data) {
        const factura = new Factura(data);
        return await factura.save();
    }

    async update(id, data) {
        return await Factura.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Factura.findByIdAndDelete(id);
    }
}

module.exports = new FacturaService();
