const express = require('express');
const router = express.Router();
const trayectoController = require('../controllers/trayecto');

router.get('/', trayectoController.getAll.bind(trayectoController));
router.get('/:id', trayectoController.getById.bind(trayectoController));
router.post('/', trayectoController.create.bind(trayectoController));
router.put('/:id', trayectoController.update.bind(trayectoController));
router.delete('/:id', trayectoController.delete.bind(trayectoController));

module.exports = router;

