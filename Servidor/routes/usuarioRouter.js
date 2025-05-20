const express = require('express');
const { verifyToken } = require('../utils/jwt');
const usuarioController = require('../controllers/usuarioController');
const router = express.Router();
/*
router.get('/', categoriaController.obtenerCategorias);
router.get('/match', categoriaController.obtenerCategoriasMatch);
router.get('/:id', categoriaController.obtenerCategoriaPorId);
router.post('/', verifyToken, categoriaController.crearCategoria);
router.post('/match', verifyToken, categoriaController.crearCategoriaMatch);
router.put('/:id', verifyToken, categoriaController.actualizarCategoria);
router.delete('/:id', verifyToken, categoriaController.eliminarCategoria);
*/
//router.post('/', verifyToken, datoController.crearDato);
router.post('/', usuarioController.crearUsuario);


module.exports = router;