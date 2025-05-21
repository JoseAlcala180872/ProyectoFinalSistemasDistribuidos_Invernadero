const express = require('express');
const AlarmaController = require('../controllers/alarmaController');
const router = express.Router();

router.post('/', AlarmaController.crearAlarma);
router.get('/', AlarmaController.obtenerAlarmas);
router.get('/todas', AlarmaController.obtenerTodasLasAlarmas);
router.get('/id/:id', AlarmaController.obtenerAlarmaPorId);
router.put('/id/:id/activar', AlarmaController.activarAlarma);
router.put('/id/:id/desactivar', AlarmaController.desactivarAlarma);
router.delete('/id/:id', AlarmaController.eliminarAlarma);

module.exports = router;