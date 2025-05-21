const WebSocket = require('ws');
const crypto = require('crypto');
const amqp = require('amqplib');

const { publicKey: clavePublica, privateKey: clavePrivada } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 2048,
});

console.log('Clave pública:', clavePublica.export({ type: 'pkcs1', format: 'pem' }));
console.log('Clave privada:', clavePrivada.export({ type: 'pkcs1', format: 'pem' }));

const wss = new WebSocket.Server({ port: 3000 });

let canalRabbitMQ;

async function conectarRabbitMQ() {
    //aqui va la contraseña y el usuario para rabbitmq
    const conexion = await amqp.connect('amqp://ruzzky:FVCM2505@localhost');
    canalRabbitMQ = await conexion.createChannel();
    await canalRabbitMQ.assertQueue('datos_sensores');
    console.log('Conectado a RabbitMQ');
}

conectarRabbitMQ();

wss.on('connection', (ws) => {
    console.log('Módulo conectado.');

    //esta es la que envia la clave publica para el sensor
    ws.send(JSON.stringify({ type: 'clavePublica', clavePublica: clavePublica.export({ type: 'pkcs1', format: 'pem' }) }));

    ws.on('message', async (message) => {
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
                if (canalRabbitMQ) {
                    canalRabbitMQ.sendToQueue('datos_sensores', Buffer.from(datosDescifrados.toString()));
                    console.log('Datos publicados en RabbitMQ');
                } else {
                    console.error('No se pudo publicar en RabbitMQ: canal no disponible.');
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