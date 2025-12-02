require("dotenv").config();
const { MongoClient, GridFSBucket } = require("mongodb");

const MONGODB_URI = process.env.MONGODB_URI || process.env.MONGO_URI;
const DB_NAME = process.env.RAG_DB_NAME || "multimodal_rag";

let client = null;
let db = null;
let gridFSBucket = null;

/**
 * Conecta a MongoDB Atlas y configura GridFS
 * Usa MongoClient nativo (no Mongoose) para soporte completo de GridFS
 */
async function connectMongoDBAtlas() {
  if (client && db) {
    console.log("⚡ Usando conexión existente de MongoDB Atlas");
    return { db, gridFSBucket };
  }

  try {
    client = new MongoClient(MONGODB_URI);
    await client.connect();

    db = client.db(DB_NAME);
    gridFSBucket = new GridFSBucket(db, {
      bucketName: "fs", // Nombre del bucket (por defecto 'fs')
    });

    console.log(`✅ Conectado a MongoDB Atlas (DB: ${DB_NAME})`);
    console.log("📦 GridFS configurado correctamente");

    return { db, gridFSBucket };
  } catch (error) {
    console.error("❌ Error conectando a MongoDB Atlas:", error.message);
    throw error;
  }
}

/**
 * Obtiene la instancia de la base de datos
 */
function getDB() {
  if (!db) {
    throw new Error(
      "Base de datos no inicializada. Llama a connectMongoDBAtlas() primero."
    );
  }
  return db;
}

/**
 * Obtiene la instancia de GridFS
 */
function getGridFS() {
  if (!gridFSBucket) {
    throw new Error(
      "GridFS no inicializado. Llama a connectMongoDBAtlas() primero."
    );
  }
  return gridFSBucket;
}

/**
 * Cierra la conexión a MongoDB
 */
async function closeMongoDBAtlas() {
  if (client) {
    await client.close();
    client = null;
    db = null;
    gridFSBucket = null;
    console.log("🔌 Conexión a MongoDB Atlas cerrada");
  }
}

module.exports = {
  connectMongoDBAtlas,
  getDB,
  getGridFS,
  closeMongoDBAtlas,
};
