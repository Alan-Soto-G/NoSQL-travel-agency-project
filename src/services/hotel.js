// Service for hotel
const Hotel = require('../models/hotel');

class HotelService {
    async findAll() {
        return await Hotel.find();
    }

    async findById(id) {
        return await Hotel.findById(id);
    }

    async create(data) {
        const hotel = new Hotel(data);
        return await hotel.save();
    }

    async update(id, data) {
        return await Hotel.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id) {
        return await Hotel.findByIdAndDelete(id);
    }
}

module.exports = new HotelService();
