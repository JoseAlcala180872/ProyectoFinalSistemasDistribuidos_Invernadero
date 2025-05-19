const db = require('./config/db');
const SensorDAO = require('./dataAccess/SensorDAO');

async function crearSensores() {
    const sensores = [
        { idSensor: 6, nombre: 'Sensor 1', ubicacion: 'Invernadero A' },
        { idSensor: 7, nombre: 'Sensor 2', ubicacion: 'Invernadero B' },
    ];

    try {
        await db.conectar(); // Reutiliza la lógica de conexión
        for (const sensor of sensores) {
            console.log('Antes de crear el sensor:', sensor);
            const sensorCreado = await SensorDAO.crearSensor(sensor);
            console.log('Sensor creado:', sensorCreado);
        }
    } catch (error) {
        console.error('Error al crear sensores:', error);
    } finally {
        await db.desconectar(); // Cierra la conexión al finalizar
    }
}

async function listarSensores() {
    try {
      const sensores = await SensorDAO.obtenerSensores();
      console.log('Sensores registrados:', sensores);
    } catch (error) {
      console.error('Error al listar sensores:', error);
    }
  }
  
crearSensores();

console.log("prueba sensores crados lista: ");
listarSensores();