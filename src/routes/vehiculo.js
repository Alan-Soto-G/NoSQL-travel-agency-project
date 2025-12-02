const express = require('express');
const router = express.Router();
const vehiculoController = require('../controllers/vehiculo');

router.get('/', vehiculoController.getAll.bind(vehiculoController));
router.get('/:id', vehiculoController.getById.bind(vehiculoController));
router.post('/', vehiculoController.create.bind(vehiculoController));
router.put('/:id', vehiculoController.update.bind(vehiculoController));
router.delete('/:id', vehiculoController.delete.bind(vehiculoController));

module.exports = router;

