require('dotenv').config();
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Conexión a Mongoose
        await mongoose.connect(process.env.MONGO_URI, {
            dbName: 'agencia_turismo'
        });

        console.log("✅ Conectado a MongoDB (Mongoose)");
    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error);
        process.exit(1);
    }
};

module.exports = { connectDB };