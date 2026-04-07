// Referencias a elementos del HTML.
const form = document.getElementById('taskForm');
const loadExampleBtn = document.getElementById('loadApiBtn');
const tableBody = document.querySelector('#taskTable tbody');
const taskCards = document.getElementById('taskCards');
const inputs = {
    task: document.querySelector('[data-input-task]'),
    description: document.querySelector('[data-input-descripcion]'),
    date: document.querySelector('[data-input-fecha]'),
    priority: document.querySelector('[data-input-prioridad]'),
    categoria: document.querySelector('[data-input-categoria]'),
    ubicacion: document.querySelector('[data-input-ubicacion]'),
    asignado: document.querySelector('[data-input-asignado]')
};

// Datos de ejemplo. Esto funciona como un "JSON" dentro de JavaScript.
const storageKey = 'domAvanzadoTasks';

const exampleTasks = [ // Son objetos con las mismas propiedades que tienes en el formulario.

    {
        task: "Comprar materiales",
        description: "Comprar pintura y pinceles para el proyecto.",
        date: "2026-04-10",
        priority: "Alta",
        categoria: "Trabajo",
        ubicacion: "Tienda",
        asignado: "Ana"
    },
    {
        task: "Enviar informe",
        description: "Enviar el informe semanal al profesor.",
        date: "2026-04-08",
        priority: "Media",
        categoria: "Estudio",
        ubicacion: "Casa",
        asignado: "Carlos"
    }
];

// Guarda las tareas actuales en localStorage.
const saveTasksToStorage = tasks => {
    localStorage.setItem(storageKey, JSON.stringify(tasks));
};

// Carga las tareas guardadas del navegador.
const loadTasksFromStorage = () => {
    const saved = localStorage.getItem(storageKey);
    return saved ? JSON.parse(saved) : null;
};

// Convierte las filas de la tabla en una lista de tareas.
const getTasksFromTable = () => {
    return Array.from(tableBody.rows).map(row => ({
        task: row.cells[0].textContent,
        description: row.cells[1].textContent,
        date: row.cells[2].textContent,
        priority: row.cells[3].textContent,
        categoria: row.cells[4].textContent,
        ubicacion: row.cells[5].textContent,
        asignado: row.cells[6].textContent,
        isCompleted: row.classList.contains('completed-row')
    }));
};

// Dibuja las cards con las tareas que existen en la tabla.
const updateCards = () => {
    const tasks = getTasksFromTable();
    taskCards.innerHTML = '';

    tasks.forEach(task => {
        const card = document.createElement('div');
        card.className = `taskCard ${task.isCompleted ? 'completed-card' : ''}`;
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

const refreshAndSave = () => {
    updateCards();
    saveTasksToStorage(getTasksFromTable());
};

// Crea una fila en la tabla con la tarea y agrega botones de acción.
const addTask = task => {
    const row = tableBody.insertRow();
    row.innerHTML = `
        <td>${task.task}</td>
        <td>${task.description}</td>
        <td>${task.date}</td>
        <td>${task.priority}</td>
        <td>${task.categoria}</td>
        <td>${task.ubicacion}</td>
        <td>${task.asignado}</td>
    `;

    const actionsCell = row.insertCell(7);
    const actionsDiv = document.createElement('div');
    actionsDiv.className = 'actions';

    const btnDone = document.createElement('button');
    btnDone.className = 'done';
    btnDone.innerHTML = '<i class="fas fa-check"></i>';
    btnDone.title = 'Marcar como terminada';
    btnDone.onclick = () => {
        row.classList.toggle('completed-row');
        refreshAndSave();
    };

    const btnEdit = document.createElement('button');
    btnEdit.className = 'edit';
    btnEdit.innerHTML = '<i class="fas fa-edit"></i>';
    btnEdit.onclick = () => {
        inputs.task.value = task.task;
        inputs.description.value = task.description;
        inputs.date.value = task.date;
        inputs.priority.value = task.priority;
        inputs.categoria.value = task.categoria;
        inputs.ubicacion.value = task.ubicacion;
        inputs.asignado.value = task.asignado;
        form.querySelector('.btnCreate').innerHTML = 'Actualizar Tarea <i class="fas fa-sync-alt"></i>';
        form.querySelector('.btnCreate').style.background = '#f39c12';
        row.remove();
    };

    const btnDelete = document.createElement('button');
    btnDelete.className = 'delete';
    btnDelete.innerHTML = '<i class="fas fa-trash"></i>';
    btnDelete.onclick = () => {
        if (confirm('¿Eliminar tarea?')) {
            row.remove();
            refreshAndSave();
        }
    };

    actionsDiv.append(btnDone, btnEdit, btnDelete);
    actionsCell.appendChild(actionsDiv);
    refreshAndSave();
};

// Carga las tareas de ejemplo en la tabla.
const loadExampleTasks = () => {
    exampleTasks.forEach(task => addTask(task));
};

// Escucha del botón de ejemplo.
loadExampleBtn.addEventListener('click', loadExampleTasks);

const loadSavedOrExampleTasks = () => {
    const savedTasks = loadTasksFromStorage();
    if (savedTasks && savedTasks.length) {
        savedTasks.forEach(task => addTask(task));
    } else {
        exampleTasks.forEach(task => addTask(task));
    }
};

// Carga al iniciar página.
loadSavedOrExampleTasks();

// Escucha del formulario para agregar tarea nueva.
form.addEventListener('submit', e => {
    e.preventDefault();
    const taskData = {
        task: inputs.task.value,
        description: inputs.description.value,
        date: inputs.date.value,
        priority: inputs.priority.value,
        categoria: inputs.categoria.value,
        ubicacion: inputs.ubicacion.value,
        asignado: inputs.asignado.value
    };
    addTask(taskData);
    form.reset();
    form.querySelector('.btnCreate').innerHTML = 'Agregar <i class="fas fa-plus-circle"></i>';
    form.querySelector('.btnCreate').style.background = '';
});