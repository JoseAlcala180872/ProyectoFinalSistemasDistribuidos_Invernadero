const mongoose = require('mongoose');

const datoSchema = new mongoose.Schema({
  humedad: {
    type: Number,
    required: true,
  },
  temperatura: {
    type: Number,
    required: true,
  },
  fechaHora: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('Dato', datoSchema);