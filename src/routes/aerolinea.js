const express = require('express');
const router = express.Router();
const aerolineaController = require('../controllers/aerolinea');

router.get('/', aerolineaController.getAll.bind(aerolineaController));
router.get('/:id', aerolineaController.getById.bind(aerolineaController));
router.post('/', aerolineaController.create.bind(aerolineaController));
router.put('/:id', aerolineaController.update.bind(aerolineaController));
router.delete('/:id', aerolineaController.delete.bind(aerolineaController));

module.exports = router;

