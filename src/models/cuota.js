const mongoose = require('mongoose');

// Model for cuota

const cuotaSchema = new mongoose.Schema({
    id_viaje: { type: String, required: true },
    numero_cuota: { type: Number, required: true },
    fecha_pago: { type: Date, required: true },
    monto: { type: Number, required: true },
    estado: { type: String, required: true }
});

module.exports = mongoose.model('Cuota', cuotaSchema, 'cuotas');
