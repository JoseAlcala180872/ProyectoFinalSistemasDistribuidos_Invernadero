const express = require('express');
const { verifyToken } = require('../utils/jwt');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();

// Rutas públicas (no requieren autenticación)
router.post('/registrar', usuarioController.crearUsuario);
router.post('/login', usuarioController.loginUsuario); // Quitar verifyToken aquí

// Rutas protegidas (requieren autenticación)
router.get('/perfil', verifyToken, usuarioController.obtenerPerfilUsuario);
router.put('/perfil', verifyToken, usuarioController.actualizarPerfilUsuario);

// Otras rutas existentes
router.get('/correo/:correo', usuarioController.obtenerUsuarioPorCorreo);

module.exports = router;