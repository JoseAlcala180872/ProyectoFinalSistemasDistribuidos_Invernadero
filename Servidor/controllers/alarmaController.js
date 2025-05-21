const AlarmaDAO = require('../dataAccess/AlarmaDAO');
const Notificacion = require('../utils/notificacion');
const { AppError } = require('../utils/appError');

class AlarmaController {
    static async crearAlarma(req, res, next) {
        try {
            const { tipo, parametro, umbral, correoNotificacion } = req.body;
            
            if (!tipo || !parametro || !umbral || !correoNotificacion) {
                return next(new AppError('Todos los campos son requeridos.', 400));
            }

            if (!["temperatura", "humedad"].includes(parametro)) {
                return next(new AppError('El parámetro debe ser "temperatura" o "humedad".', 400));
            }

            const alarma = await AlarmaDAO.crearAlarma({ tipo, parametro, umbral, correoNotificacion });
            res.status(201).json(alarma);
        } catch (error) {
            next(new AppError('Error al crear alarma.', 500));
        }
    }

    static async obtenerAlarmas(req, res, next) {
        try {
            const alarmas = await AlarmaDAO.obtenerAlarmasActivas();
            res.status(200).json(alarmas);
        } catch (error) {
            next(new AppError('Error al obtener alarmas.', 500));
        }
    }

    static async obtenerTodasLasAlarmas(req, res, next) {
        try {
            const alarmas = await AlarmaDAO.obtenerTodasLasAlarmas();
            res.status(200).json(alarmas);
        } catch (error) {
            next(new AppError('Error al obtener todas las alarmas.', 500));
        }
    }

    static async obtenerAlarmaPorId(req, res, next) {
        try {
            const { id } = req.params;
            const alarma = await AlarmaDAO.obtenerAlarmaPorId(id);
            
            if (!alarma) {
                return next(new AppError('Alarma no encontrada.', 404));
            }

            res.status(200).json(alarma);
        } catch (error) {
            next(new AppError('Error al obtener alarma por ID.', 500));
        }
    }

    static async activarAlarma(req, res, next) {
        try {
            const { id } = req.params;
            const alarma = await AlarmaDAO.activarAlarma(id);
            
            if (!alarma) {
                return next(new AppError('Alarma no encontrada.', 404));
            }

            Notificacion.enviarCorreo(alarma.correoNotificacion, `⚠️ Alarma activada: ${alarma.tipo}`);
            res.status(200).json({ mensaje: 'Alarma activada', alarma });
        } catch (error) {
            next(new AppError('Error al activar alarma.', 500));
        }
    }

    static async desactivarAlarma(req, res, next) {
        try {
            const { id } = req.params;
            const alarma = await AlarmaDAO.desactivarAlarma(id);
            
            if (!alarma) {
                return next(new AppError('Alarma no encontrada.', 404));
            }

            res.status(200).json({ mensaje: 'Alarma desactivada', alarma });
        } catch (error) {
            next(new AppError('Error al desactivar alarma.', 500));
        }
    }

    static async eliminarAlarma(req, res, next) {
        try {
            const { id } = req.params;
            const alarma = await AlarmaDAO.eliminarAlarma(id);
            
            if (!alarma) {
                return next(new AppError('Alarma no encontrada.', 404));
            }

            res.status(200).json({ mensaje: 'Alarma eliminada' });
        } catch (error) {
            next(new AppError('Error al eliminar alarma.', 500));
        }
    }
}

module.exports = AlarmaController;
