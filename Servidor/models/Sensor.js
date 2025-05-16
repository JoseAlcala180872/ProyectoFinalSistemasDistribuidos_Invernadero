const mongoose = require('mongoose')


const sensorSchema = new mongoose.Schema({
    nombre: {
      type: String,
      required: true,
    },
    tipoDatoTemperatura: {
      type: String,
      required: true,
    },
    ubicacion: {
      type: String,
      required: true,
    },
  }, { collection: 'sensores' }); 
  
  module.exports = mongoose.model('Sensor', sensorSchema);