const express = require('express');
const sensorController = require('../controllers/sensorController');

const router = express.Router();

router.get('/', sensorController.obtenerSensores);
router.post('/', sensorController.crearSensor);

module.exports = router;