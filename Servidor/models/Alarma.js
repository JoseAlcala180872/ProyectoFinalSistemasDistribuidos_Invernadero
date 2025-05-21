const mongoose = require('mongoose');

const alarmaSchema = new mongoose.Schema({
    tipo: { 
        type: String, 
        required: true 
    },
    parametro: { 
        type: String, 
        enum: ["temperatura", "humedad"], 
        required: true 
    },
    umbral: { 
        type: Number, 
        required: true 
    },
    estado: { 
        type: Boolean, 
        default: false 
    },
    correoNotificacion: { 
        type: String, 
        required: true 
    }
});

module.exports = mongoose.model('Alarma', alarmaSchema);