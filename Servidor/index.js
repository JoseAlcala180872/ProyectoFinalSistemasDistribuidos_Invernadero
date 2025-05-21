const express = require('express');
const cors = require('cors');
const amqp = require('amqplib');
const db = require('./config/db');
const DatoDAO = require('./dataAccess/DatoDAO');
const AlarmaDAO = require('./dataAccess/AlarmaDAO');
const Notificacion = require('./utils/notificacion');
const { globalErrorHandler } = require('./utils/appError');
const { verifyToken } = require('./utils/jwt'); // JWT middleware

const app = express();
process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0'; // Ignorar certificados TLS (no recomendado en producción)

// Middleware general
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Rutas públicas
const usuarioRouter = require('./routes/usuarioRouter'); // Registro/login sin JWT
app.use('/usuarios', usuarioRouter);

// Rutas protegidas (requieren JWT)
const sensorRouter = require('./routes/sensorRoute');
const datoRouter = require('./routes/datoRouter');
const alarmaRouter = require('./routes/alarmaRouter');

// Protección JWT para estas rutas
app.use('/datos', verifyToken, datoRouter);
app.use('/sensores', verifyToken, sensorRouter);
app.use('/alarmas', verifyToken, alarmaRouter);

// Ruta pública para verificar el estado de la API
app.get('/api/estado', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'API en funcionamiento',
        timestamp: new Date()
    });
});

// Ruta no encontrada
app.all('*', (req, res, next) => {
    const err = new Error(`Ruta ${req.originalUrl} no encontrada`);
    err.statusCode = 404;
    err.status = 'fail';
    next(err);
});

// Middleware global de errores
app.use(globalErrorHandler);

// Inicialización del servidor
const PORT = process.env.PORT || 3333;
const server = app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});

// Consumo de mensajes desde RabbitMQ
async function consumirRabbitMQ() {
    try {
        const conexion = await amqp.connect(process.env.RABBITMQ_URL || 'amqp://ruzzky:FVCM2505@localhost');
        const canal = await conexion.createChannel();
        await canal.assertQueue('datos_sensores');
        console.log('Conectado a RabbitMQ, esperando mensajes...');

        canal.consume('datos_sensores', async (msg) => {
            if (msg !== null) {
                try {
                    const sensorData = JSON.parse(msg.content.toString());
                    console.log('Datos recibidos de RabbitMQ:', sensorData);

                    const alarmas = await AlarmaDAO.obtenerTodasLasAlarmas();

                    for (const alarma of alarmas) {
                        if (
                            (alarma.parametro === "temperatura" && sensorData.temperatura >= alarma.umbral) ||
                            (alarma.parametro === "humedad" && sensorData.humedad >= alarma.umbral)
                        ) {
                            if (!alarma.estado) {
                                await AlarmaDAO.activarAlarma(alarma.id);
                                await Notificacion.enviarCorreo(
                                    alarma.correoNotificacion,
                                    `⚠️ Alarma activada: ${alarma.tipo}\nTemperatura actual: ${sensorData.temperatura}°C`
                                );
                            }
                        }
                    }

                    await DatoDAO.crearDato(sensorData);
                    canal.ack(msg);
                } catch (error) {
                    console.error('Error al procesar el mensaje de RabbitMQ:', error.message);
                    canal.nack(msg, false, false); // descarta el mensaje si hay error
                }
            }
        });

        // Manejo de reconexión
        conexion.on('error', (err) => {
            console.error('Error de conexión RabbitMQ:', err.message);
            setTimeout(consumirRabbitMQ, 5000);
        });

        conexion.on('close', () => {
            console.warn('Conexión RabbitMQ cerrada. Reintentando...');
            setTimeout(consumirRabbitMQ, 5000);
        });

    } catch (error) {
        console.error('Error al conectar con RabbitMQ:', error.message);
        setTimeout(consumirRabbitMQ, 5000);
    }
}

// Punto de entrada
async function main() {
    try {
        await db.conectar();
        console.log('Conexión a MongoDB establecida con éxito');
        consumirRabbitMQ();
    } catch (error) {
        console.error('Error en la inicialización:', error);
        process.exit(1);
    }
}

// Iniciar
main();

// Cierre limpio
process.on('SIGTERM', () => {
    console.log('SIGTERM recibido. Cerrando servidor...');
    server.close(() => {
        console.log('Servidor Express cerrado.');
    });
});
