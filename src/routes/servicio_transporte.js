const express = require('express');
const router = express.Router();
const servicioTransporteController = require('../controllers/servicio_transporte');

router.get('/', servicioTransporteController.getAll.bind(servicioTransporteController));
router.get('/:id', servicioTransporteController.getById.bind(servicioTransporteController));
router.post('/', servicioTransporteController.create.bind(servicioTransporteController));
router.put('/:id', servicioTransporteController.update.bind(servicioTransporteController));
router.delete('/:id', servicioTransporteController.delete.bind(servicioTransporteController));

module.exports = router;

