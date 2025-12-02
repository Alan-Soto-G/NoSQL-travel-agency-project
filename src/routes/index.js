const express = require('express');
const router = express.Router();

// Importar todas las rutas
const routes = {
    actividades_turisticas: require('./actividad_turistica'),
    administradores: require('./administrador'),
    aerolineas: require('./aerolinea'),
    aeronaves: require('./aeronave'),
    carros: require('./carro'),
    clientes: require('./cliente'),
    cliente_viaje: require('./cliente_viaje'),
    cuotas: require('./cuota'),
    facturas: require('./factura'),
    guias: require('./guia'),
    guia_actividad: require('./guia_actividad'),
    habitaciones: require('./habitacion'),
    hoteles: require('./hotel'),
    itinerarios_transporte: require('./itinerario_transporte'),
    municipios: require('./municipio'),
    planes: require('./plan'),
    plan_actividad: require('./plan_actividad'),
    reservas: require('./reserva'),
    servicios_transporte: require('./servicio_transporte'),
    tarjetas_bancarias: require('./tarjeta_bancaria'),
    trayectos: require('./trayecto'),
    vehiculos: require('./vehiculo'),
    gps: require('./gps'),
    viajes: require('./viaje'),
    viaje_plan: require('./viaje_plan'),
    usuarios: require('./usuario')
};

// Registrar todas las rutas automáticamente
Object.entries(routes).forEach(([path, route]) => {
    router.use(`/${path}`, route);
});

module.exports = router;

