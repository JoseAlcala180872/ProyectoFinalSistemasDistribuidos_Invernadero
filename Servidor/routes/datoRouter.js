const express = require('express');
const { verifyToken } = require('../utils/jwt');
const datoController = require('../controllers/datoController');
const router = express.Router();

// Ruta pública (sin autenticación)
router.get('/publica/ultima-hora', datoController.obtenerPromedioUltimaHora);

// Rutas protegidas (requieren JWT)
router.get('/', verifyToken, datoController.obtenerDatos);
router.post('/', verifyToken, datoController.crearDato);
router.get('/agrupados', verifyToken, datoController.obtenerDatosAgrupados);
router.get('/ultimasFechas', verifyToken, datoController.obtenerUltimasFechas);
router.get('/lapso', verifyToken, datoController.obtenerDatosPorLapso);
router.get('/ultima-hora', verifyToken, datoController.obtenerPromedioUltimaHora);
router.get('/paginados', verifyToken, datoController.obtenerDatosPaginados);
router.get('/filtrados', verifyToken, datoController.obtenerDatosFiltrados);
router.get('/por-hora', verifyToken, datoController.obtenerDatosPorHora);

module.exports = router;
// Este archivo define las rutas para la gestión de datos.
// Incluye rutas públicas y protegidas que requieren autenticación mediante JWT.