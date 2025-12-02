// Service for plan_actividad
const PlanActividad = require('../models/plan_actividad');

class PlanActividadService {
    async findAll() {
        return await PlanActividad.find();
    }

    async findByPlanAndActividad(id_plan, id_actividad) {
        return await PlanActividad.findOne({ id_plan, id_actividad });
    }

    async create(data) {
        const planActividad = new PlanActividad(data);
        return await planActividad.save();
    }

    async update(id_plan, id_actividad, data) {
        return await PlanActividad.findOneAndUpdate(
            { id_plan, id_actividad },
            data,
            { new: true }
        );
    }

    async delete(id_plan, id_actividad) {
        return await PlanActividad.findOneAndDelete({ id_plan, id_actividad });
    }
}

module.exports = new PlanActividadService();
