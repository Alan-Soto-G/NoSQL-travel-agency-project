const express = require('express');
const router = express.Router();
const municipioController = require('../controllers/municipio');

router.get('/', municipioController.getAll.bind(municipioController));
router.get('/:id', municipioController.getById.bind(municipioController));
router.post('/', municipioController.create.bind(municipioController));
router.put('/:id', municipioController.update.bind(municipioController));
router.delete('/:id', municipioController.delete.bind(municipioController));

module.exports = router;

