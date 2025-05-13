const mongoose = require('mongoose')


const sensorSchema = new mongoose.Schema({
    idSensor: {
      type: Number,
      required: true,
      unique: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    ubicacion: {
      type: String,
      required: true,
    },
    fechaRegistro: {
      type: Date,
      default: Date.now,
    },
  }, { collection: 'sensores' }); 
  
  module.exports = mongoose.model('Sensor', sensorSchema);