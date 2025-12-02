// Service for gps
const Gps = require('../models/gps');

class GpsService {
    async findAll() {
        return await Gps.find();
    }

    async findById(id) {
        return await Gps.findById(id);
    }

    async create(data) {
        const gps = new Gps(data);
        return await gps.save();
    }

    async update(id, data) {
        return await Gps.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Gps.findByIdAndDelete(id);
    }
}

module.exports = new GpsService();
