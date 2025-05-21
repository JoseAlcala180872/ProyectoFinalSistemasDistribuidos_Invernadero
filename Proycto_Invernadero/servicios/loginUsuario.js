// Servicio para login de usuario por correo
// Servicio para login de usuario por correo y clave (POST seguro)
export async function loginUsuario(correo, clave) {
  try {
    const response = await fetch('http://localhost:3333/usuarios/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ correo, clave }),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Error al iniciar sesión');
    }
    const data = await response.json();
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  } catch (error) {
    throw error;
  }
}
