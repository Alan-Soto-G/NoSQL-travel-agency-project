// Service for vehiculo
const Vehiculo = require('../models/vehiculo');

class VehiculoService {
    async findAll() {
        return await Vehiculo.find();
    }

    async findById(id) {
        return await Vehiculo.findById(id);
    }

    async create(data) {
        const vehiculo = new Vehiculo(data);
        return await vehiculo.save();
    }

    async update(id, data) {
        return await Vehiculo.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Vehiculo.findByIdAndDelete(id);
    }
}

module.exports = new VehiculoService();
