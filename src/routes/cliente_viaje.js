const express = require('express');
const router = express.Router();
const clienteViajeController = require('../controllers/cliente_viaje');

router.get('/', clienteViajeController.getAll.bind(clienteViajeController));
router.get('/cliente/:id_cliente/viaje/:id_viaje', clienteViajeController.getByClienteAndViaje.bind(clienteViajeController));
router.post('/', clienteViajeController.create.bind(clienteViajeController));
router.put('/cliente/:id_cliente/viaje/:id_viaje', clienteViajeController.update.bind(clienteViajeController));
router.delete('/cliente/:id_cliente/viaje/:id_viaje', clienteViajeController.delete.bind(clienteViajeController));

module.exports = router;

