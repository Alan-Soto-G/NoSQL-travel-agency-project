const express = require('express');
const router = express.Router();
const planActividadController = require('../controllers/plan_actividad');

router.get('/', planActividadController.getAll.bind(planActividadController));
router.get('/plan/:id_plan/actividad/:id_actividad', planActividadController.getByPlanAndActividad.bind(planActividadController));
router.post('/', planActividadController.create.bind(planActividadController));
router.put('/plan/:id_plan/actividad/:id_actividad', planActividadController.update.bind(planActividadController));
router.delete('/plan/:id_plan/actividad/:id_actividad', planActividadController.delete.bind(planActividadController));

module.exports = router;

