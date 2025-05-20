document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  if (!form) return;


  form.addEventListener("submit", async (e) => {
    e.preventDefault();


    const nombre = document.getElementById("username").value.trim();
    const correo = document.getElementById("email").value.trim();
    const clave = document.getElementById("password").value;


    if (!nombre || !correo || clave.length < 6) {
      alert("Por favor, completa correctamente el formulario.");
      return;
    }


    try {
      // Lógica fetch directa para registrar usuario
      const response = await fetch("http://localhost:3333/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, correo, clave }),
      });
      if (!response.ok) throw new Error("Error en el registro");
      alert("Usuario creado con éxito.");
      window.location.href = "login.html";
    } catch (error) {
      alert("Hubo un problema al registrar el usuario.");
      console.error(error);
    }
  });
});
