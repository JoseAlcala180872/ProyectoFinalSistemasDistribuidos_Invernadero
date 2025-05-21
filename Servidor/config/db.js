const mongoose = require('mongoose');
require('dotenv').config({ path: './variables.env' });

const config = {
    url: process.env.URL_MONGO,
    options: {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
};

/**
 * Función para conectar a la base de datos MongoDB
 * @returns {Promise} Promesa de conexión a MongoDB
 */
function conectar() {
    console.log('Intentando conectar a MongoDB...');
    return mongoose.connect(config.url, config.options)
        .then(() => {
            console.log('Conexión a MongoDB establecida con éxito');
        })
        .catch(error => {
            console.error('Error al conectar a MongoDB:', error);
            throw error;
        });
}

/**
 * Función para desconectar de la base de datos
 * @returns {Promise} Promesa de desconexión de MongoDB
 */
function desconectar() {
    return mongoose.disconnect()
        .then(() => {
            console.log('Desconexión de MongoDB completada');
        })
        .catch(error => {
            console.error('Error al desconectar de MongoDB:', error);
            throw error;
        });
}

module.exports = { conectar, desconectar };