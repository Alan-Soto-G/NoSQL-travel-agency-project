// Service for cliente_viaje
const ClienteViaje = require('../models/cliente_viaje');

class ClienteViajeService {
    async findAll() {
        return await ClienteViaje.find();
    }

    async findByClienteAndViaje(id_cliente, id_viaje) {
        return await ClienteViaje.findOne({ id_cliente, id_viaje });
    }

    async create(data) {
        const clienteViaje = new ClienteViaje(data);
        return await clienteViaje.save();
    }

    async update(id_cliente, id_viaje, data) {
        return await ClienteViaje.findOneAndUpdate(
            { id_cliente, id_viaje },
            data,
            { new: true }
        );
    }

    async delete(id_cliente, id_viaje) {
        return await ClienteViaje.findOneAndDelete({ id_cliente, id_viaje });
    }
}

module.exports = new ClienteViajeService();
