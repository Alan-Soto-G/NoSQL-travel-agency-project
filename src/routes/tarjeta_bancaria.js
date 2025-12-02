const express = require('express');
const router = express.Router();
const tarjetaBancariaController = require('../controllers/tarjeta_bancaria');

router.get('/', tarjetaBancariaController.getAll.bind(tarjetaBancariaController));
router.get('/:id', tarjetaBancariaController.getById.bind(tarjetaBancariaController));
router.post('/', tarjetaBancariaController.create.bind(tarjetaBancariaController));
router.put('/:id', tarjetaBancariaController.update.bind(tarjetaBancariaController));
router.delete('/:id', tarjetaBancariaController.delete.bind(tarjetaBancariaController));

module.exports = router;

