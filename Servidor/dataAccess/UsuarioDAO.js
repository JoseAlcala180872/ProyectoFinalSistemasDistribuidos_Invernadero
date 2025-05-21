const Usuario = require('../models/Usuario');

class UsuarioDAO {
    constructor() { }
  
    /**
     * Crea un nuevo usuario en la base de datos
     * @param {Object} usuarioData - Datos del usuario a crear
     * @returns {Promise<Object>} Usuario creado
     */
    async crearUsuario(usuarioData) {
        try {
            const usuario = new Usuario(usuarioData);
            return await usuario.save();
        } catch (error) {
            // Si es un error de duplicado (correo ya registrado)
            if (error.code === 11000) {
                throw new Error('El correo ya está registrado');
            }
            throw error;
        }
    }
    
    /**
     * Obtiene un usuario por su ID
     * @param {String} id - ID del usuario
     * @returns {Promise<Object|null>} Usuario encontrado o null
     */
    async obtenerUsuarioPorId(id) {
        try {
            return await Usuario.findById(id);
        } catch (error) {
            throw error;
        }
    }
  
    /**
     * Obtiene un usuario por su correo
     * @param {String} correo - Correo del usuario
     * @returns {Promise<Object|null>} Usuario encontrado o null
     */
    async obtenerUsuarioPorCorreo(correo) {
        try {
            return await Usuario.findOne({ correo });
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Actualiza un usuario por su ID
     * @param {String} id - ID del usuario
     * @param {Object} usuarioData - Datos a actualizar
     * @returns {Promise<Object|null>} Usuario actualizado o null
     */
    async actualizarUsuario(id, usuarioData) {
        try {
            // No permitir actualizar la clave por este método
            if (usuarioData.clave) {
                delete usuarioData.clave;
            }
            
            return await Usuario.findByIdAndUpdate(
                id, 
                usuarioData, 
                { new: true, runValidators: true }
            );
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Actualiza la clave de un usuario
     * @param {String} id - ID del usuario
     * @param {String} nuevaClave - Nueva clave (sin hashear)
     * @returns {Promise<Object|null>} Usuario actualizado o null
     */
    async actualizarClave(id, nuevaClave) {
        try {
            const usuario = await Usuario.findById(id);
            if (!usuario) return null;
            
            usuario.clave = nuevaClave; // El middleware pre-save hasheará la clave
            return await usuario.save();
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Obtiene todos los usuarios
     * @returns {Promise<Array>} Lista de usuarios
     */
    async obtenerUsuarios() {
        try {
            return await Usuario.find({});
        } catch (error) {
            throw error;
        }
    }
    
    /**
     * Elimina un usuario por su ID
     * @param {String} id - ID del usuario
     * @returns {Promise<Object|null>} Usuario eliminado o null
     */
    async eliminarUsuario(id) {
        try {
            return await Usuario.findByIdAndDelete(id);
        } catch (error) {
            throw error;
        }
    }
}
  
module.exports = new UsuarioDAO();