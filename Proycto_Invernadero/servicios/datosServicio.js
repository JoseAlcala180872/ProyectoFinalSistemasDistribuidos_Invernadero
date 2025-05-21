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
