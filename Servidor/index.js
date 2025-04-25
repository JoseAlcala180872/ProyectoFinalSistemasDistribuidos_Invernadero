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
}

main();