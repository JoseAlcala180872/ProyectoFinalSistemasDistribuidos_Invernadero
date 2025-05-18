
        // Aquí puedes añadir funcionalidad JavaScript para interactividad
        // Por ejemplo, para cambiar la fecha o actualizar el gráfico cuando se selecciona otro sensor
        
        document.getElementById('sensors').addEventListener('change', function() {
            // Aquí puedes añadir la lógica para actualizar el gráfico según el sensor seleccionado
            console.log('Sensor seleccionado:', this.value);
        });
        
        document.querySelector('.calendar-icon').addEventListener('click', function() {
            // Aquí puedes añadir la lógica para abrir un selector de fecha
            console.log('Calendario clickeado');
        });
    