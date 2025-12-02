// Controller for cliente
const clienteService = require('../services/cliente');

class ClienteController {
    async getAll(req, res) {
        try {
            const clientes = await clienteService.findAll();
            res.json(clientes);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.findById(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const cliente = await clienteService.create(req.body);
            res.status(201).json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.update(id, req.body);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json(cliente);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const cliente = await clienteService.delete(id);
            if (!cliente) {
                return res.status(404).json({ error: 'Cliente no encontrado' });
            }
            res.json({ message: 'Cliente eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new ClienteController();
