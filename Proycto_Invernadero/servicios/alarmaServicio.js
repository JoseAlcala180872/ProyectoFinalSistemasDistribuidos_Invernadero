export async function obtenerAlarmas() {
  const response = await fetch('http://localhost:3333/alarmas');
  if (!response.ok) throw new Error('No se pudieron obtener las alarmas');
  return await response.json();
}

export async function crearAlarma(alarma) {
  const response = await fetch('http://localhost:3333/alarmas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(alarma)
  });
  if (!response.ok) throw new Error('Error al crear alarma');
  return await response.json();
}

export async function desactivarAlarma(id) {
  const response = await fetch(`http://localhost:3333/alarmas/${id}/desactivar`, {
    method: 'PUT',
  });
  if (!response.ok) throw new Error('Error al desactivar la alarma');
  return await response.json();
}