const express = require('express');
const { verifyToken } = require('../utils/jwt');
const datoController = require('../controllers/datoController');
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
router.get('/', verifyToken, datoController.obtenerDatos);
router.post('/', verifyToken, datoController.crearDato);
router.get('/agrupados', verifyToken, datoController.obtenerDatosAgrupados);
router.get('/ultimasFechas', verifyToken, datoController.obtenerUltimasFechas);
//esta se maneja asi: http://localhost:3333/datos/lapso?inicio=2025-05-01&fin=2025-05-17
router.get('/lapso', verifyToken, datoController.obtenerDatosPorLapso);
router.get('/ultima-hora', verifyToken, datoController.obtenerPromedioUltimaHora);
router.get('/paginados', verifyToken, datoController.obtenerDatosPaginados);
router.get('/filtrados', verifyToken, datoController.obtenerDatosFiltrados);
router.get('/por-hora', verifyToken, datoController.obtenerDatosPorHora);
module.exports = router;