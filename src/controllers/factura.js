// Controller for factura
const facturaService = require('../services/factura');

class FacturaController {
    async getAll(req, res) {
        try {
            const facturas = await facturaService.findAll();
            res.json(facturas);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getById(req, res) {
        try {
            const { id } = req.params;
            const factura = await facturaService.findById(id);
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            }
            res.json(factura);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async create(req, res) {
        try {
            const factura = await facturaService.create(req.body);
            res.status(201).json(factura);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const factura = await facturaService.update(id, req.body);
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            }
            res.json(factura);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const factura = await facturaService.delete(id);
            if (!factura) {
                return res.status(404).json({ error: 'Factura no encontrada' });
            }
            res.json({ message: 'Factura eliminada exitosamente' });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = new FacturaController();
