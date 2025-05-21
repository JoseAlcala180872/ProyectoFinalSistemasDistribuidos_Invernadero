// Servicio para obtener los últimos datos de temperatura y humedad
export async function obtenerUltimosDatos() {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch('http://localhost:3333/datos', {
      headers: {
        'Authorization': token ? token : ''
      }
    });
    if (!response.ok) throw new Error('No se pudieron obtener los datos');
    const datos = await response.json();
    return datos;
  } catch (error) {
    throw error;
  }
}

// Servicio para obtener datos por intervalo de fechas
export async function obtenerDatosPorIntervalo(fechaInicio, fechaFin) {
  try {
    const token = localStorage.getItem('token');
    if (!fechaInicio || !fechaFin) {
      throw new Error('Debes proporcionar las fechas de inicio y fin.');
    }
    const response = await fetch(`http://localhost:3333/datos/lapso?inicio=${fechaInicio}&fin=${fechaFin}`, {
      headers: {
        'Authorization': token ? token : ''

      }
    });
    if (!response.ok) throw new Error('No se pudieron obtener los datos del intervalo');
    const datos = await response.json();
    return datos;
  } catch (error) {
    throw error;
  }
}
