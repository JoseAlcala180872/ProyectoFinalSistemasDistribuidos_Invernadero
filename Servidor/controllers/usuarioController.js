const { AppError } = require('../utils/appError');
const UsuarioDAO = require('../dataAccess/UsuarioDAO');
const bcrypt = require('bcrypt');
const { generateToken } = require('../utils/jwt');

class usuarioController {
    /**
     * Crea un nuevo usuario
     * @param {Object} req - Objeto de solicitud Express
     * @param {Object} res - Objeto de respuesta Express
     * @param {Function} next - Función next de Express
     */
    static async crearUsuario(req, res, next) {
        try {
            const { nombre, correo, clave } = req.body;
            
            // Validar campos obligatorios
            if (!nombre || !correo || !clave) {
                return next(new AppError('Los campos nombre, correo y clave son obligatorios.', 400));
            }
            
            // No hashear la clave aquí, el modelo lo hará automáticamente
            const usuarioData = { nombre, correo, clave };
            const usuario = await UsuarioDAO.crearUsuario(usuarioData);
            
            // Generar token JWT
            const token = generateToken(usuario);
            
            // Responder con el usuario creado y el token
            res.status(201).json({
                status: 'success',
                token,
                data: {
                    usuario
                }
            });
        } catch (error) {
            console.error(error);
            if (error.message === 'El correo ya está registrado') {
                return next(new AppError(error.message, 400));
            }
            next(new AppError('Error al crear usuario.', 500));
        }
    }

    /**
     * Obtiene un usuario por su correo
     * @param {Object} req - Objeto de solicitud Express
     * @param {Object} res - Objeto de respuesta Express
     * @param {Function} next - Función next de Express
     */
    static async obtenerUsuarioPorCorreo(req, res, next) {
        try {
            const { correo } = req.params;
            const usuario = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
            
            if (!usuario) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            
            res.status(200).json({
                status: 'success',
                data: {
                    usuario
                }
            });
        } catch (error) {
            console.error(error);
            next(new AppError('Error al obtener usuario.', 500));
        }
    }

    /**
     * Inicia sesión de un usuario y genera un token JWT
     * @param {Object} req - Objeto de solicitud Express
     * @param {Object} res - Objeto de respuesta Express
     * @param {Function} next - Función next de Express
     */
    static async loginUsuario(req, res, next) {
        try {
            const { correo, clave } = req.body;
            
            // Verificar que se proporcionen credenciales
            if (!correo || !clave) {
                return next(new AppError('Por favor proporcione correo y clave.', 400));
            }
            
            // Buscar usuario por correo
            const usuario = await UsuarioDAO.obtenerUsuarioPorCorreo(correo);
            if (!usuario) {
                return next(new AppError('Credenciales incorrectas.', 401));
            }
            
            // Verificar clave
            const esValida = await usuario.compararClave(clave);
            if (!esValida) {
                return next(new AppError('Credenciales incorrectas.', 401));
            }
            
            // Generar token JWT
            const token = generateToken(usuario);
            
            // Responder con el usuario y el token
            res.status(200).json({
                status: 'success',
                token,
                data: {
                    usuario
                }
            });
        } catch (error) {
            console.error(error);
            next(new AppError('Error al iniciar sesión.', 500));
        }
    }
    
    /**
     * Obtiene el perfil del usuario autenticado
     * @param {Object} req - Objeto de solicitud Express
     * @param {Object} res - Objeto de respuesta Express
     * @param {Function} next - Función next de Express
     */
    static async obtenerPerfilUsuario(req, res, next) {
        try {
            const usuario = await UsuarioDAO.obtenerUsuarioPorId(req.user.id);
            
            if (!usuario) {
                return next(new AppError('Usuario no encontrado.', 404));
            }
            
            res.status(200).json({
                status: 'success',
                data: {
                    usuario
                }
            });
        } catch (error) {
            console.error(error);
            next(new AppError('Error al obtener perfil de usuario.', 500));
        }
    }
    
    /**
     * Actualiza los datos del usuario autenticado
     * @param {Object} req - Objeto de solicitud Express
     * @param {Object} res - Objeto de respuesta Express
     * @param {Function} next - Función next de Express
     */
    static async actualizarPerfilUsuario(req, res, next) {
        try {
            // No permitir cambiar el correo o la clave por este método
            const { nombre } = req.body;
            
            if (!nombre) {
                return next(new AppError('Por favor proporcione los datos a actualizar.', 400));
            }
            
            const usuarioActualizado = await UsuarioDAO.actualizarUsuario(req.user.id, { nombre });
            
            res.status(200).json({
                status: 'success',
                data: {
                    usuario: usuarioActualizado
                }
            });
        } catch (error) {
            console.error(error);
            next(new AppError('Error al actualizar perfil de usuario.', 500));
        }
    }
}

module.exports = usuarioController;