const WebSocket = require('ws');
const db = require('./config/db');
const DatoDAO = require('./dataAccess/DatoDAO');
//const UsuarioDAO = require('./dataAccess/UsuarioDAO');
const amqp = require('amqplib');
const express = require('express');
const app = express();

app.use(express.json());

const sensorRouter = require('./routes/sensorRouter');
const datoRouter = require('./routes/datoRouter');
const usarioRouter = require('./routes/usarioRouter');
app.use('/datos', datoRouter);
app.use('/usuarios', usarioRouter);
app.use('/sensores', sensorRouter);

const PORT = process.env.PORT || 3333;

app.listen(PORT, () => {
    console.log(`Servidor Express escuchando en el puerto ${PORT}`);
});


/*
const wss = new WebSocket.Server({ port: 4000 });

wss.on('connection', (ws) => {
    console.log('Conexión establecida con el gateway.');

    ws.on('message', async (message) => {
        try {
            const sensorData = JSON.parse(message);
            console.log('Datos recibidos del gateway:', sensorData);

            // Guardar los datos en la base de datos
            await DatoDAO.crearDato(sensorData).then(datoGuardado => {
                console.log('Dato guardado en la base de datos:', datoGuardado);
            }).catch(error => {
                console.error('Error al guardar el dato:', error);
            });
        } catch (error) {
            console.error('Error al procesar los datos recibidos:', error.message);
        }
    });

    ws.on('close', () => {
        console.log('Conexión cerrada con el gateway.');
    });
});

wss.on('listening', () => {
    console.log('Servidor escuchando en el puerto 4000.');
});

wss.on('error', (err) => {
    console.error('Error del servidor WebSocket:', err.message);
});*/

async function consumirRabbitMQ() {
    //aqui va la contraseña y el usuario para rabbitmq
    // ejemplo: amqp://usuario:contraseña@localhost'
    const conexion = await amqp.connect('amqp://admin:proyectos21@localhost');
    const canal = await conexion.createChannel();
    await canal.assertQueue('datos_sensores');
    canal.consume('datos_sensores', async (msg) => {
        if (msg !== null) {
            try {
                const sensorData = JSON.parse(msg.content.toString());
                // Guardar los datos en la base de datos
                await DatoDAO.crearDato(sensorData).then(datoGuardado => {
                    console.log('Dato guardado en la base de datos:', datoGuardado);
                }).catch(error => {
                    console.error('Error al guardar el dato:', error);
                });
                canal.ack(msg);
            } catch (error) {
                console.error('Error al procesar los datos recibidos:', error.message);
                canal.nack(msg, false, false); // descarta el mensaje si hay error
            }
        }
    });
    console.log('Servidor consumiendo mensajes de RabbitMQ');
}

async function main() {
    //Conexion establecida.
    await db.conectar().then(() => {
        console.log('Conexión establecida con éxito');
    }).catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });

    consumirRabbitMQ();
    /*UsuarioDAO.crearUsuario({
  "nombre": "Juan",
  "correo": "juan@ejemplo.com",
  "clave": "123456"
    }).then(usuarioGuardado => {
        console.log('Usuario guardado en la base de datos:', usuarioGuardado);
    }).catch(error => {
        console.error('Error al guardar el usuario:', error);
    });*/
}

main();