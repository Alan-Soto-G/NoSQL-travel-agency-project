// Service for viaje_plan
const ViajePlan = require('../models/viaje_plan');

class ViajePlanService {
    async findAll() {
        return await ViajePlan.find();
    }

    async findByViajeAndPlan(id_viaje, id_plan) {
        return await ViajePlan.findOne({ id_viaje, id_plan });
    }

    async create(data) {
        const viajePlan = new ViajePlan(data);
        return await viajePlan.save();
    }

    async update(id_viaje, id_plan, data) {
        return await ViajePlan.findOneAndUpdate(
            { id_viaje, id_plan },
            data,
            { new: true }
        );
    }

    async delete(id_viaje, id_plan) {
        return await ViajePlan.findOneAndDelete({ id_viaje, id_plan });
    }
}

module.exports = new ViajePlanService();
