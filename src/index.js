require("dotenv").config();
const express = require("express");
const { connectDB } = require("./config/db");
const apiRoutes = require("./routes");
const ragRoutes = require("./routes/rag");

const app = express();
const port = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Rutas de prueba
app.get("/", (req, res) => {
  res.send("¡API de Agencia de Viajes funcionando!");
});

// Registrar todas las rutas de la API
app.use("/api", apiRoutes);

// Registrar rutas RAG
app.use("/api/rag", ragRoutes);

// Iniciar el servidor solo después de conectar a la BD
async function startServer() {
  try {
    await connectDB(); // Conecta a MongoDB (Mongoose + Native Client + GridFS)

    app.listen(port, () => {
      console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();
