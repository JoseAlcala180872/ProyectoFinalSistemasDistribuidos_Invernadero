<<<<<<< Updated upstream
const db = require('./config/db');
const DatoDAO = require('./dataAccess/DatoDAO');

async function main() {
    //Conexion establecida.
    await db.conectar().then(() => {
        console.log('Conexión establecida con éxito');
    }).catch(error => {
        console.error('Error al conectar a la base de datos:', error);
    });
    //Insertar un nuevo dato.
    await DatoDAO.crearDato({ humedad: 25, temperatura: 20, fechaHora:  new Date()}).then(datoGuardado => {
        console.log('Producto creado exitosamente:', datoGuardado);
    }).catch(error => {
        console.error('Error al crear el producto:', error);
    });

    //Desconexión de la base de datos.
    db.desconectar().then(() => {
        console.log('Desconexión exitosa');
    }).catch(error => {
        console.error('Error al desconectar a la base de datos:', error);
    });;
=======
const amqp = require('amqplib');
const db = require('./config/db');
const DatoDAO = require('./dataAccess/DatoDAO');

const queue = 'datos_sensores';

async function consumirCola() {
    const conn = await amqp.connect('amqp://localhost');
    const channel = await conn.createChannel();
    await channel.assertQueue(queue, { durable: true });

    channel.consume(queue, async (msg) => {
        if (msg !== null) {
            try {
                const sensorData = JSON.parse(msg.content.toString());
                console.log('Datos recibidos de RabbitMQ:', sensorData);

                // Guardar los datos en la base de datos
                await DatoDAO.crearDato(sensorData)
                    .then(datoGuardado => {
                        console.log('Dato guardado en la base de datos:', datoGuardado);
                    })
                    .catch(error => {
                        console.error('Error al guardar el dato:', error);
                    });
            } catch (error) {
                console.error('Error al procesar los datos recibidos:', error.message);
            }
            channel.ack(msg);
        }
    });
}

async function main() {
    await db.conectar()
        .then(() => {
            console.log('Conexión establecida con éxito');
            consumirCola();
        })
        .catch(error => {
            console.error('Error al conectar a la base de datos:', error);
        });
>>>>>>> Stashed changes
}

main();