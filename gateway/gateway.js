const WebSocket = require('ws');
const crypto = require('crypto');

const { publicKey: clavePublica, privateKey: clavePrivada } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

console.log('Clave pública:', clavePublica.export({ type: 'pkcs1', format: 'pem' }));
console.log('Clave privada:', clavePrivada.export({ type: 'pkcs1', format: 'pem' }));

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

    //esta es la que envia la clave publica para el sensor
    ws.send(JSON.stringify({ type: 'clavePublica', clavePublica: clavePublica.export({ type: 'pkcs1', format: 'pem' }) }));

    ws.on('message', (message) => {
        try {
            const datosRecibidos = JSON.parse(message);

            if (datosRecibidos.type === 'encryptedData') {
                const datosDescifrados = crypto.privateDecrypt(
                    {
                        key: clavePrivada,
                        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
                    },
                    Buffer.from(datosRecibidos.data, 'base64')
                );
                console.log('Datos recibidos:', datosDescifrados.toString());
                if (serverSocket.readyState === WebSocket.OPEN) {
                    serverSocket.send(datosDescifrados.toString());
                    console.log("Datos reenviados al servidor correctamente");
                } else {
                    console.error('No se pudo reenviar los datos: conexión con el servidor no está abierta.');
                }
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