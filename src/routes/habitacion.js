const express = require('express');
const router = express.Router();
const habitacionController = require('../controllers/habitacion');

router.get('/', habitacionController.getAll.bind(habitacionController));
router.get('/:id', habitacionController.getById.bind(habitacionController));
router.post('/', habitacionController.create.bind(habitacionController));
router.put('/:id', habitacionController.update.bind(habitacionController));
router.delete('/:id', habitacionController.delete.bind(habitacionController));

module.exports = router;

