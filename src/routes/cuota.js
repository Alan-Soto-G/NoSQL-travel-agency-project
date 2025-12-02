const express = require('express');
const router = express.Router();
const cuotaController = require('../controllers/cuota');

router.get('/', cuotaController.getAll.bind(cuotaController));
router.get('/:id', cuotaController.getById.bind(cuotaController));
router.post('/', cuotaController.create.bind(cuotaController));
router.put('/:id', cuotaController.update.bind(cuotaController));
router.delete('/:id', cuotaController.delete.bind(cuotaController));

module.exports = router;

