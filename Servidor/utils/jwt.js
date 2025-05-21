const jwt = require('jsonwebtoken');
require('dotenv').config({ path: './variables.env' });

// Obtener clave secreta desde variables de entorno o usar valor predeterminado
const secretKey = process.env.JWT_SECRET || 'mi_clave_secreta_muy_segura'; 
const expiresIn = process.env.JWT_EXPIRES_IN || '24h';

/**
 * Genera un token JWT con la información del usuario
 * @param {Object} user - Datos del usuario para incluir en el token
 * @returns {String} Token JWT generado
 */
function generateToken(user) {
    // Asegurarse de no incluir información sensible como la clave hasheada
    const userData = {
        id: user._id || user.id,
        nombre: user.nombre,
        correo: user.correo,
        // Puedes agregar más campos según necesites
    };
    
    return jwt.sign(userData, secretKey, { expiresIn });
}

/**
 * Middleware para verificar y validar un token JWT
 * @param {Object} req - Objeto de solicitud Express
 * @param {Object} res - Objeto de respuesta Express
 * @param {Function} next - Función next de Express
 */
function verifyToken(req, res, next) {
    // Obtener el token del encabezado Authorization
    const authHeader = req.header('Authorization');
    
    if (!authHeader) {
        return res.status(401).json({ error: 'Acceso denegado: Token no proporcionado' });
    }
    
    // Verificar formato del token (puede venir como "Bearer [token]")
    const token = authHeader.startsWith('Bearer ') 
        ? authHeader.substring(7) 
        : authHeader;

    try {
        // Verificar y decodificar el token
        const decoded = jwt.verify(token, secretKey);
        
        // Agregar la información del usuario al objeto de solicitud
        req.user = decoded;
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ error: 'Acceso denegado: Token expirado' });
        }
        
        return res.status(403).json({ error: 'Acceso denegado: Token no válido' });
    }
}

module.exports = { generateToken, verifyToken };