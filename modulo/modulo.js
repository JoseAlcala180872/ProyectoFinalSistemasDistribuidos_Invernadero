const WebSocket = require('ws');

// Simulacion de los de la bd 
const sensores = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 }
];

// Función para generar datos del sensor
function generateSensorData(sensorId) {
    const now = new Date();
    return {
        idSensor: sensorId, 
        humedad: (Math.random() * 100).toFixed(2),
        temperatura: (Math.random() * 50).toFixed(2),
        fechaHora: now.toLocaleString('en-GB').replace(',', '') // Formato: DD/MM/YYYY HH:MM:SS
    };
}

sensores.forEach((sensor) => {
    const ws = new WebSocket('ws://127.0.0.1:3000');

    ws.on('open', () => {
        console.log(`Conectado al gateway para el sensor ${sensor.id}.`);

        // Enviar datos cada 5 segundos
        setInterval(() => {
            const sensorData = generateSensorData(sensor.id);
            ws.send(JSON.stringify(sensorData)); 
            console.log(`Datos enviados:`, JSON.stringify(sensorData)); 
        }, 5000);
    });

    ws.on('error', (err) => {
        console.error(`Error en el sensor ${sensor.id}:`, err.message);
    });

    ws.on('close', () => {
        console.log(`Conexión cerrada para el sensor ${sensor.id}.`);
    });
});