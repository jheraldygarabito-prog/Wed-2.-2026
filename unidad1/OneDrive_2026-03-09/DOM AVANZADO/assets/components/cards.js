import tabla from "./tabla.js";

const cards = (() => {
    const taskCards = document.getElementById('taskCards');

    const update = () => {
        // Obtenemos todas las tareas que están en la tabla.
        const tasks = tabla.getTask();
        taskCards.innerHTML = ''; // Limpiamos el contenedor antes de redibujar

        tasks.forEach((task) => {
            const card = document.createElement('div');
            
            // Añade clase de tarjeta completada si ya se marcó como terminada.
            card.className = `taskCard ${task.isCompleted ? 'completed-card' : ''}`;
            
            // Crea el HTML de la tarjeta con todos los campos.
            card.innerHTML = `
                <h4>${task.isCompleted ? '✅' : '🚀'} ${task.task}</h4>
                <p><strong>Descripción:</strong> ${task.description}</p>
                <p><strong>Fecha:</strong> ${task.date}</p>
                <p><strong>Prioridad:</strong> ${task.priority}</p>
                <p><strong>Categoría:</strong> ${task.categoria}</p>
                <p><strong>Ubicación:</strong> ${task.ubicacion}</p>
                <p><strong>Asignado a:</strong> ${task.asignado}</p>
                ${task.isCompleted ? '<div style="margin-top:10px; color: #27ae60; font-weight: bold; text-align:right;">¡TAREA TERMINADA!</div>' : ''}
            `;
            taskCards.appendChild(card);
        });
    };

    return { update };
})();

export default cards;