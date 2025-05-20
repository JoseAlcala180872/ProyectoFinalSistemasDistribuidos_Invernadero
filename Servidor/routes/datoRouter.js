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
router.get('/', datoController.obtenerDatos);
router.post('/', datoController.crearDato);
router.get('/agrupados', datoController.obtenerDatosAgrupados);
router.get('/ultimasFechas', datoController.obtenerUltimasFechas);
//esta se maneja asi: http://localhost:3333/datos/lapso?inicio=2025-05-01&fin=2025-05-17
router.get('/lapso', datoController.obtenerDatosPorLapso);
router.get('/ultima-hora', datoController.obtenerPromedioUltimaHora);
router.get('/paginados', datoController.obtenerDatosPaginados);
router.get('/filtrados', datoController.obtenerDatosFiltrados);
router.get('/por-hora', datoController.obtenerDatosPorHora);
module.exports = router;