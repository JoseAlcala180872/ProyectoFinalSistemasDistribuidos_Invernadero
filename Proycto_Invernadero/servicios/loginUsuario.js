// Servicio para login de usuario por correo
export async function loginUsuario(correo, clave) {
  try {
    const response = await fetch(`http://localhost:3333/usuarios/${encodeURIComponent(correo)}`);
    if (!response.ok) throw new Error('Usuario no encontrado');
    const usuario = await response.json();
    if (usuario.clave !== clave) {
      throw new Error('Contraseña incorrecta');
    }
    return usuario;
  } catch (error) {
    throw error;
  }
}
