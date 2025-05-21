export async function obtenerAlarmas() {
  const response = await fetch('http://localhost:3333/alarmas');
  if (!response.ok) throw new Error('No se pudieron obtener las alarmas');
  return await response.json();
}