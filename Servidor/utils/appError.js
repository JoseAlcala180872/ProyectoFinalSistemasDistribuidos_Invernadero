const winston = require('winston');

// Configuración de logger para errores
const logger = winston.createLogger({
    level: 'error',
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
    ),
    defaultMeta: { service: 'invernadero-api' },
    transports: [
        new winston.transports.File({ filename: 'errores.log' })
    ]
});

// Agregar transporte de consola si no estamos en producción
if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }));
}

/**
 * Clase personalizada para manejar errores operacionales
 */
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

/**
 * Middleware global para manejar errores
 * @param {Error} err - Error capturado
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
    
    // Registrar error en logs
    logger.error({
        message: err.message,
        stack: err.stack,
        path: req.originalUrl,
        method: req.method,
        statusCode: err.statusCode
    });

    // Respuesta para errores operacionales
    if (err.isOperational) {
        return res.status(err.statusCode).json({
            status: err.status,
            message: err.message
        });
    }
    
    // Errores de programación o desconocidos: no enviar detalles al cliente
    console.error('ERROR ', err);
    
    // En desarrollo, enviar el error completo
    if (process.env.NODE_ENV === 'development') {
        return res.status(500).json({
            status: 'error',
            message: err.message,
            error: err,
            stack: err.stack
        });
    }
    
    // En producción, enviar mensaje genérico
    res.status(500).json({
        status: 'error',
        message: 'Algo salió mal!'
    });
};

module.exports = { AppError, globalErrorHandler };