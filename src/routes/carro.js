const express = require('express');
const router = express.Router();
const carroController = require('../controllers/carro');

router.get('/', carroController.getAll.bind(carroController));
router.get('/:id', carroController.getById.bind(carroController));
router.post('/', carroController.create.bind(carroController));
router.put('/:id', carroController.update.bind(carroController));
router.delete('/:id', carroController.delete.bind(carroController));

module.exports = router;

