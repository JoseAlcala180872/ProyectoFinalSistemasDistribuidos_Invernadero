const WebSocket = require('ws');
<<<<<<< Updated upstream

const wss = new WebSocket.Server({ port: 3000 });

=======
const crypto = require('crypto');
const amqp = require('amqplib');

const { publicKey: clavePublica, privateKey: clavePrivada } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

console.log('Clave pública:', clavePublica.export({ type: 'pkcs1', format: 'pem' }));
console.log('Clave privada:', clavePrivada.export({ type: 'pkcs1', format: 'pem' }));

const wss = new WebSocket.Server({ port: 3000 });

let channel;
const queue = 'datos_sensores';

// Conexión a RabbitMQ
amqp.connect('amqp://localhost')
    .then(conn => conn.createChannel())
    .then(ch => {
        channel = ch;
        return channel.assertQueue(queue, { durable: true });
    })
    .catch(console.error);

>>>>>>> Stashed changes
wss.on('connection', (ws) => {
    console.log('Módulo conectado.');

    ws.on('message', (message) => {
        try {
<<<<<<< Updated upstream
            const receivedData = JSON.parse(message);
            console.log('Datos recibidos:', JSON.stringify(receivedData));
=======
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
                if (channel) {
                    channel.sendToQueue(queue, Buffer.from(datosDescifrados.toString()), { persistent: true });
                    console.log("Datos enviados a la cola RabbitMQ correctamente");
                } else {
                    console.error('No se pudo enviar los datos: canal de RabbitMQ no disponible.');
                }
            }
>>>>>>> Stashed changes
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