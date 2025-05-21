const express = require('express');
const sensorController = require('../controllers/sensorController');
const { verifyToken } = require('../utils/jwt');

const router = express.Router();

router.get('/', verifyToken, sensorController.obtenerSensores);
router.post('/', verifyToken, sensorController.crearSensor);

module.exports = router;