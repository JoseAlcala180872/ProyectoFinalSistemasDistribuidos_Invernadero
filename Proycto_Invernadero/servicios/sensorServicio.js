// Servicio para sensores
export async function obtenerSensores() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3333/sensores', {
    headers: {
      'Authorization': token ? token : ''
    }
  });
  if (!response.ok) throw new Error('Error al obtener sensores');
  return await response.json();
}

export async function agregarSensor(sensor) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3333/sensores', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token ? token : '' },
    body: JSON.stringify(sensor)
  });
  if (!response.ok) throw new Error('Error al agregar sensor');
  return await response.json();
}
