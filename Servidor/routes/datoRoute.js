const express = require('express');
const DatoController = require('../controllers/datoController');

const router = express.Router();

router.get('/', DatoController.obtenerDatos);

router.get('/agrupados', DatoController.obtenerDatosAgrupados);
router.get('/ultimasFechas', DatoController.obtenerUltimasFechas);
//esta se maneja asi: http://localhost:3100/datos/lapso?inicio=2025-05-01&fin=2025-05-17
router.get('/lapso', DatoController.obtenerDatosPorLapso);
router.get('/ultima-hora', DatoController.obtenerPromedioUltimaHora);
router.get('/paginados', DatoController.obtenerDatosPaginados);
router.get('/filtrados', DatoController.obtenerDatosFiltrados);

module.exports = router;