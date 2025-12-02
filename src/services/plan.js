// Service for plan
const Plan = require('../models/plan');

class PlanService {
    async findAll() {
        return await Plan.find();
    }

    async findById(id) {
        return await Plan.findById(id);
    }

    async create(data) {
        const plan = new Plan(data);
        return await plan.save();
    }

    async update(id, data) {
        return await Plan.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Plan.findByIdAndDelete(id);
    }
}

module.exports = new PlanService();
