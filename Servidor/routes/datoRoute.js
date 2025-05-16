const express = require('express');
const DatoController = require('../controllers/datoController');

const router = express.Router();

router.get('/', DatoController.obtenerDatos);

module.exports = router;