const jwt = require('jsonwebtoken')
const secretKey = 'mi_clave_secreta'; //cambiar en prod

function generateToken(user) {
    return jwt.sign(user, secretKey, { expiresIn: '1h' })
}

function verifyToken(req, res, next) {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(403).json({ error: 'Acceso denegado:  Token no proporcionado' })
    }

    jwt.verify(token, secretKey, (err, user) => {
        if (err) {
            return res.status(403).json({ error: 'Acceso denegado: Token no valido.' })
        }

        req.user = user;
        next();
    })
}

module.exports = { generateToken, verifyToken };