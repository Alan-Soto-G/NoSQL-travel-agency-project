const express = require('express');
const router = express.Router();
const actividadTuristicaController = require('../controllers/actividad_turistica');

router.get('/', actividadTuristicaController.getAll.bind(actividadTuristicaController));
router.get('/:id', actividadTuristicaController.getById.bind(actividadTuristicaController));
router.post('/', actividadTuristicaController.create.bind(actividadTuristicaController));
router.put('/:id', actividadTuristicaController.update.bind(actividadTuristicaController));
router.delete('/:id', actividadTuristicaController.delete.bind(actividadTuristicaController));

module.exports = router;