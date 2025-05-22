import { obtenerDatosPorIntervalo } from '../../servicios/datosServicio.js';

function mostrarError(mensaje) {
    let errorDiv = document.getElementById('error-fechas');
    if (!errorDiv) {
        errorDiv = document.createElement('div');
        errorDiv.id = 'error-fechas';
        errorDiv.style.color = 'white';
        errorDiv.style.background = '#e74c3c';
        errorDiv.style.padding = '10px';
        errorDiv.style.margin = '10px 0';
        errorDiv.style.borderRadius = '5px';
        errorDiv.style.textAlign = 'center';
        const container = document.querySelector('.content');
        container.insertBefore(errorDiv, container.firstChild.nextSibling);
    }
    errorDiv.textContent = mensaje;
    errorDiv.style.display = 'block';
}

function ocultarError() {
    const errorDiv = document.getElementById('error-fechas');
    if (errorDiv) errorDiv.style.display = 'none';
}

// FunciÃ³n para renderizar la tabla con los datos recibidos
function renderizarTabla(datos) {
    const tbody = document.querySelector('.datos-tabla tbody');
    tbody.innerHTML = '';
    if (!datos || datos.length === 0) {
        tbody.innerHTML = '<tr><td colspan="3">Sin datos en el intervalo</td></tr>';
        return;
    }
    datos.forEach(dato => {
        // Mostramos fecha, promedio humedad y promedio temperatura
        const fecha = dato._id || '';
        const promedioHumedad = dato.promedioHumedad !== undefined ? dato.promedioHumedad.toFixed(2) : '';
        const promedioTemperatura = dato.promedioTemperatura !== undefined ? dato.promedioTemperatura.toFixed(2) : '';
        const row = `<tr><td>${fecha}</td><td>${promedioHumedad}</td><td>${promedioTemperatura}</td></tr>`;
        tbody.innerHTML += row;
    });
}

// Evento para buscar datos cuando se seleccionan fechas
const fechaInicio = document.getElementById('fechaInicio');
const fechaFin = document.getElementById('fechaFin');
const buscarFechasBtn = document.getElementById('buscarFechas');

buscarFechasBtn.addEventListener('click', async function() {
    ocultarError();
    console.log("si entra")
    if (!fechaInicio.value || !fechaFin.value) {
        mostrarError('Debes seleccionar ambas fechas para buscar.');
        renderizarTabla([]);
        return;
    }
    try {
        const datos = await obtenerDatosPorIntervalo(fechaInicio.value, fechaFin.value);
        renderizarTabla(datos);
        ocultarError();
    } catch (e) {
        mostrarError(e.message || 'Error al obtener los datos.');
        renderizarTabla([]);
    }
});