require('dotenv').config();
const express = require('express');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para entender JSON
app.use(express.json());

// Rutas de prueba
app.get('/', (req, res) => {
    res.send('¡API de Agencia de Viajes funcionando!');
});

// Registrar todas las rutas de la API
app.use('/api', apiRoutes);

// Iniciar el servidor solo después de conectar a la BD
async function startServer() {
    try {
        await connectDB(); // Conectar a MongoDB primero

        app.listen(port, () => {
            console.log(`🚀 Servidor corriendo en http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Error al iniciar el servidor:", error);
    }
}

startServer();