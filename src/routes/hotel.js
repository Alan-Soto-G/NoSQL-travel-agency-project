const express = require('express');
const router = express.Router();
const hotelController = require('../controllers/hotel');

router.get('/', hotelController.getAll.bind(hotelController));
router.get('/:id', hotelController.getById.bind(hotelController));
router.post('/', hotelController.create.bind(hotelController));
router.put('/:id', hotelController.update.bind(hotelController));
router.delete('/:id', hotelController.delete.bind(hotelController));

module.exports = router;

