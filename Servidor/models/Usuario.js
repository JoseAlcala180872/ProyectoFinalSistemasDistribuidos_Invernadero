const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true,
  },
  correo: {
    type: String,
    required: true,
  },
  clave: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Usuario', usuarioSchema);