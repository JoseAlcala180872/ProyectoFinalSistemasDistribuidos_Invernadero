const express = require('express');
const AlarmaController = require('../controllers/alarmaController');
const router = express.Router();

router.post('/', AlarmaController.crearAlarma);
router.get('/', AlarmaController.obtenerAlarmas);
router.get('/todas', AlarmaController.obtenerTodasLasAlarmas);
router.get('/:id', AlarmaController.obtenerAlarmaPorId);
router.put('/:id/activar', AlarmaController.activarAlarma);
router.put('/:id/desactivar', AlarmaController.desactivarAlarma);
router.delete('/:id', AlarmaController.eliminarAlarma);

module.exports = router;