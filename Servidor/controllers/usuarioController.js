const { AppError } = require('../utils/appError');
const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const bcrypt = require('bcrypt');

class usuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, clave} = req.body;
            if (!nombre || !correo || !clave) {
                return next(new AppError('Los campos nombre, correo y clave son requeridos.', 400));
            }
            const claveHasheada = await bcrypt.hash(clave, 10);
            const usuarioData = { nombre, correo, clave: claveHasheada };
            const usuario = await UsuarioDAO.crearUsuario(usuarioData);
            res.status(201).json(usuario);
        } catch (error) {
            console.error(error); // Mostrar el error real en consola
            next(new AppError('Error al crear usuario.', 500));
        }
    }

    static async obtenerUsuarioPorCorreo(req, res, next) {
        try {
            const { correo } = req.params;
            const usuario = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
            if (!usuario) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            res.status(200).json(usuario);
        } catch (error) {
            console.error(error); // Mostrar el error real en consola
            next(new AppError('Error al obtener usuario.', 500));
        }
    }

    static async loginUsuario(req, res, next) {
    try {
        const { correo, clave } = req.body;
        const usuario = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
        if (!usuario) {
            return next(new AppError('Usuario no encontrado.', 404));
        }
        const esValida = await bcrypt.compare(clave, usuario.clave);
        if (!esValida) {
            return next(new AppError('Contraseña incorrecta.', 401));
        }
        // Opcional: no enviar la clave hasheada al frontend
        const usuarioSinClave = usuario.toObject();
        delete usuarioSinClave.clave;
        res.status(200).json(usuarioSinClave);
    } catch (error) {
        next(new AppError('Error al iniciar sesión.', 500));
    }
}
}

module.exports = usuarioController;