const form = document.getElementById('formSensor');
const tipo = document.getElementById('tipo');
const unidad = document.getElementById('unidad');
const mensajeExito = document.getElementById('mensajeExito');
const sensorID = document.getElementById('sensorID');

const unidadesPorTipo = {
  Temperatura: '°C',
  Humedad: '%',
  CO2: 'ppm',
  Iluminación: 'lux',
  'Humedad de suelo': '%'
};

tipo.addEventListener('change', () => {
  unidad.value = unidadesPorTipo[tipo.value] || '';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const idGenerado = generarID(tipo.value);
  sensorID.textContent = `ID generado: ${idGenerado}`;
  mensajeExito.classList.remove('oculto');
  form.reset();
});

function generarID(tipo) {
  const prefix = tipo.substring(0, 3).toUpperCase();
  const fecha = new Date();
  const fechaStr = `${fecha.getFullYear().toString().slice(2)}${(fecha.getMonth()+1).toString().padStart(2, '0')}${fecha.getDate().toString().padStart(2, '0')}`;
  return `${prefix}-${fechaStr}`;
}
