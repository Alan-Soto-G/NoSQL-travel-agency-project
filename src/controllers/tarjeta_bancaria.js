// Controller for tarjeta_bancaria
const tarjetaBancariaService = require('../services/tarjeta_bancaria');

class TarjetaBancariaController {
    async getAll(req, res) {
        try {
            const tarjetaBancarias = await tarjetaBancariaService.findAll();
            res.json(tarjetaBancarias);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const tarjetaBancaria = await tarjetaBancariaService.findById(id);
            if (!tarjetaBancaria) {
                return res.status(404).json({ error: 'TarjetaBancaria no encontrada' });
            }
            res.json(tarjetaBancaria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const tarjetaBancaria = await tarjetaBancariaService.create(req.body);
            res.status(201).json(tarjetaBancaria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const tarjetaBancaria = await tarjetaBancariaService.update(id, req.body);
            if (!tarjetaBancaria) {
                return res.status(404).json({ error: 'TarjetaBancaria no encontrada' });
            }
            res.json(tarjetaBancaria);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const tarjetaBancaria = await tarjetaBancariaService.delete(id);
            if (!tarjetaBancaria) {
                return res.status(404).json({ error: 'TarjetaBancaria no encontrada' });
            }
            res.json({ message: 'TarjetaBancaria eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new TarjetaBancariaController();
