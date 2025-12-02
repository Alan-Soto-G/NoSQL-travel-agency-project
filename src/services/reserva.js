// Service for reserva
const Reserva = require('../models/reserva');

class ReservaService {
    async findAll() {
        return await Reserva.find();
    }

    async findById(id) {
        return await Reserva.findById(id);
    }

    async create(data) {
        const reserva = new Reserva(data);
        return await reserva.save();
    }

    async update(id, data) {
        return await Reserva.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Reserva.findByIdAndDelete(id);
    }
}

module.exports = new ReservaService();
