// Controller for municipio
const municipioService = require('../services/municipio');

class MunicipioController {
    async getAll(req, res) {
        try {
            const municipios = await municipioService.findAll();
            res.json(municipios);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const municipio = await municipioService.findById(id);
            if (!municipio) {
                return res.status(404).json({ error: 'Municipio no encontrado' });
            }
            res.json(municipio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const municipio = await municipioService.create(req.body);
            res.status(201).json(municipio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const municipio = await municipioService.update(id, req.body);
            if (!municipio) {
                return res.status(404).json({ error: 'Municipio no encontrado' });
            }
            res.json(municipio);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const municipio = await municipioService.delete(id);
            if (!municipio) {
                return res.status(404).json({ error: 'Municipio no encontrado' });
            }
            res.json({ message: 'Municipio eliminado exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new MunicipioController();
