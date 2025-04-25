const WebSocket = require('ws');
const db = require('./config/db');
const DatoDAO = require('./dataAccess/DatoDAO');

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
});

async function main() {
    //Conexion establecida.
    await db.conectar().then(() => {
        console.log('Conexión establecida con éxito');
    }).catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });
}

main();