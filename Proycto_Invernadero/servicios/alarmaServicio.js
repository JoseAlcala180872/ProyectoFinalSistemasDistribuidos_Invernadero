export async function obtenerAlarmas() {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3333/alarmas', {
    headers: {
      'Authorization': token ? token : ''
    }
  });
  if (!response.ok) throw new Error('No se pudieron obtener las alarmas');
  return await response.json();
}

export async function crearAlarma(alarma) {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:3333/alarmas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': token ? token : '' },
    body: JSON.stringify(alarma)
  });
  if (!response.ok) throw new Error('Error al crear alarma');
  return await response.json();
}

export async function desactivarAlarma(id) {
  const token = localStorage.getItem('token');
  const response = await fetch(`http://localhost:3333/alarmas/${id}/desactivar`, {
    method: 'PUT',
    headers: {
      'Authorization': token ? token : ''
    }
  });
  if (!response.ok) throw new Error('Error al desactivar la alarma');
  return await response.json();
}