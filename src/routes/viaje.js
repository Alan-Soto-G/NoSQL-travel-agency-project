const express = require('express');
const router = express.Router();
const viajeController = require('../controllers/viaje');

router.get('/', viajeController.getAll.bind(viajeController));
router.get('/:id', viajeController.getById.bind(viajeController));
router.post('/', viajeController.create.bind(viajeController));
router.put('/:id', viajeController.update.bind(viajeController));
router.delete('/:id', viajeController.delete.bind(viajeController));

module.exports = router;

