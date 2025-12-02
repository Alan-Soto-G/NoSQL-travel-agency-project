const express = require('express');
const router = express.Router();
const planController = require('../controllers/plan');

router.get('/', planController.getAll.bind(planController));
router.get('/:id', planController.getById.bind(planController));
router.post('/', planController.create.bind(planController));
router.put('/:id', planController.update.bind(planController));
router.delete('/:id', planController.delete.bind(planController));

module.exports = router;

