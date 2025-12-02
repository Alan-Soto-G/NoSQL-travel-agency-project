const express = require('express');
const router = express.Router();
const itinerarioTransporteController = require('../controllers/itinerario_transporte');

router.get('/', itinerarioTransporteController.getAll.bind(itinerarioTransporteController));
router.get('/:id', itinerarioTransporteController.getById.bind(itinerarioTransporteController));
router.post('/', itinerarioTransporteController.create.bind(itinerarioTransporteController));
router.put('/:id', itinerarioTransporteController.update.bind(itinerarioTransporteController));
router.delete('/:id', itinerarioTransporteController.delete.bind(itinerarioTransporteController));

module.exports = router;

