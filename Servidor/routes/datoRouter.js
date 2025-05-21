const express = require('express');
const datoController = require('../controllers/datoController');
const router = express.Router();

// Ruta pública (sin autenticación)
router.get('/publica/ultima-hora', datoController.obtenerPromedioUltimaHora);

// Rutas protegidas (la protección se aplica en index.js)
router.get('/', datoController.obtenerDatos);
router.post('/', datoController.crearDato);
router.get('/agrupados', datoController.obtenerDatosAgrupados);
router.get('/ultimas-fechas', datoController.obtenerUltimasFechas); // corregido
router.get('/lapso', datoController.obtenerDatosPorLapso);
router.get('/ultima-hora', datoController.obtenerPromedioUltimaHora);
router.get('/paginados', datoController.obtenerDatosPaginados);
router.get('/filtrados', datoController.obtenerDatosFiltrados);
router.get('/por-hora', datoController.obtenerDatosPorHora);

module.exports = router;
// Este archivo define las rutas para la gestión de datos.
// Incluye rutas públicas y protegidas que requieren autenticación mediante JWT.