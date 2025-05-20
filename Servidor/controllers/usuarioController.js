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
}

module.exports = usuarioController;