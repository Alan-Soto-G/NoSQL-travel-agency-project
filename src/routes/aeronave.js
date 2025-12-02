const express = require('express');
const router = express.Router();
const aeronaveController = require('../controllers/aeronave');

router.get('/', aeronaveController.getAll.bind(aeronaveController));
router.get('/:id', aeronaveController.getById.bind(aeronaveController));
router.post('/', aeronaveController.create.bind(aeronaveController));
router.put('/:id', aeronaveController.update.bind(aeronaveController));
router.delete('/:id', aeronaveController.delete.bind(aeronaveController));

module.exports = router;

