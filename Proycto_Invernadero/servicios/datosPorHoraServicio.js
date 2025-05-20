// Servicio para obtener promedios de temperatura y humedad por hora
export async function obtenerDatosPorHora() {
  const response = await fetch('http://localhost:3333/datos/por-hora');
  if (!response.ok) throw new Error('No se pudieron obtener los datos por hora');
  return await response.json();
}
