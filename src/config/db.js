require('dotenv').config();
const mongoose = require('mongoose');
const { MongoClient, GridFSBucket } = require('mongodb');

let gridFSBucket = null;
let nativeDB = null;

const connectDB = async () => {
    try {
        // Conexión a Mongoose con opciones adicionales
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: 'agencia_turismo',
            serverSelectionTimeoutMS: 30000,
            socketTimeoutMS: 45000,
            family: 4,
            tls: true,
            retryWrites: true
        });

        console.log("✅ Conectado a MongoDB (Mongoose) - DB: agencia_turismo");

        // Reutilizar la conexión de Mongoose para obtener el cliente nativo
        const mongooseClient = mongoose.connection.getClient();

        // Crear conexión a la base de datos RAG usando el mismo cliente
        nativeDB = mongooseClient.db('multimodal_rag');

        // Configurar GridFS en la base de datos RAG
        gridFSBucket = new GridFSBucket(nativeDB, {
            bucketName: 'fs'
        });

        console.log("✅ Conectado a MongoDB (Native Client) - DB: multimodal_rag");
        console.log("📦 GridFS configurado correctamente");

    } catch (error) {
        console.error("❌ Error conectando a MongoDB:", error.message);
        console.error("\n💡 Posibles soluciones:");
        console.error("   1. Verifica que tu IP esté en la whitelist de MongoDB Atlas");
        console.error("   2. Ve a Atlas → Network Access y agrega tu IP actual");
        console.error("   3. O permite acceso desde cualquier IP (0.0.0.0/0) solo para pruebas");
        process.exit(1);
    }
};

/**
 * Obtiene la instancia de la base de datos RAG
 */
function getRagDB() {
    if (!nativeDB) {
        throw new Error('Base de datos RAG no inicializada. Llama a connectDB() primero.');
    }
    return nativeDB;
}

/**
 * Obtiene la instancia de GridFS
 */
function getGridFS() {
    if (!gridFSBucket) {
        throw new Error('GridFS no inicializado. Llama a connectDB() primero.');
    }
    return gridFSBucket;
}

module.exports = { connectDB, getRagDB, getGridFS };
