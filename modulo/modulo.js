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

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); 
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');

    //formato correcto para almacenarlo en mongo 
    const fechaHora = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
   
    return {
        idSensor: sensorId,
        humedad: (Math.random() * 100).toFixed(2),
        temperatura: (Math.random() * 50).toFixed(2),
        fechaHora: fechaHora 
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