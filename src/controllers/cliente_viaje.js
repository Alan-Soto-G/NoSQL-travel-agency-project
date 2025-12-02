// Controller for cliente_viaje
const clienteViajeService = require('../services/cliente_viaje');

class ClienteViajeController {
    async getAll(req, res) {
        try {
            const clienteViajes = await clienteViajeService.findAll();
            res.json(clienteViajes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getByClienteAndViaje(req, res) {
        try {
            const { id_cliente, id_viaje } = req.params;
            const clienteViaje = await clienteViajeService.findByClienteAndViaje(id_cliente, id_viaje);
            if (!clienteViaje) {
                return res.status(404).json({ error: 'ClienteViaje no encontrado' });
            }
            res.json(clienteViaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const clienteViaje = await clienteViajeService.create(req.body);
            res.status(201).json(clienteViaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id_cliente, id_viaje } = req.params;
            const clienteViaje = await clienteViajeService.update(id_cliente, id_viaje, req.body);
            if (!clienteViaje) {
                return res.status(404).json({ error: 'ClienteViaje no encontrado' });
            }
            res.json(clienteViaje);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id_cliente, id_viaje } = req.params;
            const clienteViaje = await clienteViajeService.delete(id_cliente, id_viaje);
            if (!clienteViaje) {
                return res.status(404).json({ error: 'ClienteViaje no encontrado' });
            }
            res.json({ message: 'ClienteViaje eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ClienteViajeController();
