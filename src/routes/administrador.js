const express = require('express');
const router = express.Router();
const administradorController = require('../controllers/administrador');

router.get('/', administradorController.getAll.bind(administradorController));
router.get('/:id', administradorController.getById.bind(administradorController));
router.post('/', administradorController.create.bind(administradorController));
router.put('/:id', administradorController.update.bind(administradorController));
router.delete('/:id', administradorController.delete.bind(administradorController));

module.exports = router;

