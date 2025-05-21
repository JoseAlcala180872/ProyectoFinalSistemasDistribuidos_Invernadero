const express = require('express');
const AlarmaController = require('../controllers/alarmaController');
const { verifyToken } = require('../utils/jwt');
const router = express.Router();

router.post('/', verifyToken, AlarmaController.crearAlarma);
router.get('/', verifyToken, AlarmaController.obtenerAlarmas);
router.get('/todas', verifyToken, AlarmaController.obtenerTodasLasAlarmas);
router.get('/:id', verifyToken, AlarmaController.obtenerAlarmaPorId);
router.put('/:id/activar', verifyToken, AlarmaController.activarAlarma);
router.put('/:id/desactivar', verifyToken, AlarmaController.desactivarAlarma);
router.delete('/:id', verifyToken, AlarmaController.eliminarAlarma);

module.exports = router;