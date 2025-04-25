const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

const serverSocket = new WebSocket('ws://127.0.0.1:4000');

serverSocket.on('open', () => {
    console.log('Conectado al servidor principal.');
});

serverSocket.on('error', (err) => {
    console.error('Error en la conexión con el servidor:', err.message);
});

wss.on('connection', (ws) => {
    console.log('Módulo conectado.');

    ws.on('message', (message) => {
        try {
            const receivedData = JSON.parse(message);
            console.log('Datos recibidos:', JSON.stringify(receivedData));
            if (serverSocket.readyState === WebSocket.OPEN) {
                serverSocket.send(JSON.stringify(receivedData));
                console.log("Datos reenviados al servidor correctamente");
            } else {
                console.error('No se pudo reenviar los datos: conexión con el servidor no está abierta.');
            }
        } catch (error) {
            console.error('Error al procesar los datos:', error.message);
        }
    });

    ws.on('close', () => {
        console.log('Conexión terminada.');
    });
});

wss.on('listening', () => {
    console.log('Gateway escuchando en el puerto 3000.');
});

wss.on('error', (err) => {
    console.error('Error del servidor:', err.message);
});