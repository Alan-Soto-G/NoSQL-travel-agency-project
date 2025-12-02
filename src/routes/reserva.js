const express = require('express');
const router = express.Router();
const reservaController = require('../controllers/reserva');

router.get('/', reservaController.getAll.bind(reservaController));
router.get('/:id', reservaController.getById.bind(reservaController));
router.post('/', reservaController.create.bind(reservaController));
router.put('/:id', reservaController.update.bind(reservaController));
router.delete('/:id', reservaController.delete.bind(reservaController));

module.exports = router;

