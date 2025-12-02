const express = require('express');
const router = express.Router();
const viajePlanController = require('../controllers/viaje_plan');

router.get('/', viajePlanController.getAll.bind(viajePlanController));
router.get('/viaje/:id_viaje/plan/:id_plan', viajePlanController.getByViajeAndPlan.bind(viajePlanController));
router.post('/', viajePlanController.create.bind(viajePlanController));
router.put('/viaje/:id_viaje/plan/:id_plan', viajePlanController.update.bind(viajePlanController));
router.delete('/viaje/:id_viaje/plan/:id_plan', viajePlanController.delete.bind(viajePlanController));

module.exports = router;