const express = require('express');
const router = express.Router();
const guiaController = require('../controllers/guia');

router.get('/', guiaController.getAll.bind(guiaController));
router.get('/:id', guiaController.getById.bind(guiaController));
router.post('/', guiaController.create.bind(guiaController));
router.put('/:id', guiaController.update.bind(guiaController));
router.delete('/:id', guiaController.delete.bind(guiaController));

module.exports = router;

