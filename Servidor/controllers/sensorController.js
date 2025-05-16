const SensorDAO = require('../dataAccess/SensorDAO');
const { AppError } = require('../utils/appError');

class SensorController {
    static async crearSensor(req, res, next) {
        try {
            const { nombre, tipoDatoTemperatura, ubicacion } = req.body;

            if (!nombre || !tipoDatoTemperatura || !ubicacion) {
                return next(new AppError('Todos los campos son requeridos.', 400));
            }

            const sensorData = { nombre, tipoDatoTemperatura, ubicacion };
            const sensorCreado = await SensorDAO.crearSensor(sensorData);
            res.status(201).json(sensorCreado);
        } catch (error) {
            next(new AppError('Error al crear el sensor.', 500));
        }
    }

    static async obtenerSensores(req, res, next) {
        try {
            const sensores = await SensorDAO.obtenerSensores();

            if (!sensores || sensores.length === 0) {
                return next(new AppError('No se encontraron sensores.', 404));
            }

            res.status(200).json(sensores);
        } catch (error) {
            next(new AppError('Error al obtener sensores.', 500));
        }
    }
}

module.exports = SensorController;