// Controller for carro
const carroService = require('../services/carro');

class CarroController {
    async getAll(req, res) {
        try {
            const carros = await carroService.findAll();
            res.json(carros);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const carro = await carroService.findById(id);
            if (!carro) {
                return res.status(404).json({ error: 'Carro no encontrado' });
            }
            res.json(carro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const carro = await carroService.create(req.body);
            res.status(201).json(carro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const carro = await carroService.update(id, req.body);
            if (!carro) {
                return res.status(404).json({ error: 'Carro no encontrado' });
            }
            res.json(carro);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const carro = await carroService.delete(id);
            if (!carro) {
                return res.status(404).json({ error: 'Carro no encontrado' });
            }
            res.json({ message: 'Carro eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new CarroController();
