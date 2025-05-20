const { AppError } = require('../utils/appError');
const UsuarioDAO = require('../dataAccess/UsuarioDAO');

class usuarioController {
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, clave} = req.body;
            if (!nombre || !correo || !clave) {
                return next(new AppError('Los campos nombre, correo y clave son requeridos.', 400));
            }
            const usuarioData = { nombre, correo, clave };
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
}

module.exports = usuarioController;