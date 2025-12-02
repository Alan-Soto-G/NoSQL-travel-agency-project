const express = require('express');
const router = express.Router();
const facturaController = require('../controllers/factura');

router.get('/', facturaController.getAll.bind(facturaController));
router.get('/:id', facturaController.getById.bind(facturaController));
router.post('/', facturaController.create.bind(facturaController));
router.put('/:id', facturaController.update.bind(facturaController));
router.delete('/:id', facturaController.delete.bind(facturaController));

module.exports = router;

