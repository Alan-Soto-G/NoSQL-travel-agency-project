const express = require('express');
const router = express.Router();
const guiaActividadController = require('../controllers/guia_actividad');

router.get('/', guiaActividadController.getAll.bind(guiaActividadController));
router.get('/guia/:id_guia/actividad/:id_actividad', guiaActividadController.getByGuiaAndActividad.bind(guiaActividadController));
router.post('/', guiaActividadController.create.bind(guiaActividadController));
router.put('/guia/:id_guia/actividad/:id_actividad', guiaActividadController.update.bind(guiaActividadController));
router.delete('/guia/:id_guia/actividad/:id_actividad', guiaActividadController.delete.bind(guiaActividadController));

module.exports = router;

