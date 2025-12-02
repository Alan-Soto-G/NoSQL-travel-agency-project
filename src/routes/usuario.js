const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuario');

router.get('/', usuarioController.getAll.bind(usuarioController));
router.get('/:id', usuarioController.getById.bind(usuarioController));
router.post('/', usuarioController.create.bind(usuarioController));
router.put('/:id', usuarioController.update.bind(usuarioController));
router.delete('/:id', usuarioController.delete.bind(usuarioController));

module.exports = router;

