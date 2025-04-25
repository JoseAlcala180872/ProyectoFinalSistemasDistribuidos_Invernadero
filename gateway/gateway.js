const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 3000 });

wss.on('connection', (ws) => {
    console.log('Módulo conectado.');

    ws.on('message', (message) => {
        try {
            const receivedData = JSON.parse(message);
            console.log('Datos recibidos:', JSON.stringify(receivedData));
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