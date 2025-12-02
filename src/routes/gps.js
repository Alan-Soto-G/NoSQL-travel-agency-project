const express = require('express');
const router = express.Router();
const GpsController = require('../controllers/gps');

router.get('/', GpsController.getAll.bind(GpsController));
router.get('/:id', GpsController.getById.bind(GpsController));
router.post('/', GpsController.create.bind(GpsController));
router.put('/:id', GpsController.update.bind(GpsController));
router.delete('/:id', GpsController.delete.bind(GpsController));

module.exports = router;

