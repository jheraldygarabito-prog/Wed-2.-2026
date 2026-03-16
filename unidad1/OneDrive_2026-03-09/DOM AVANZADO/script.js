import Form from "./assets/components/formulario.js";
import tabla from "./assets/components/tabla.js";
import cards from "./assets/components/cards.js";

(() => {
    // Inicializamos la escucha del formulario
    Form.setDatos((task) => {
        tabla.addTask(task); // Agrega a la tabla
        cards.update();      // Actualiza las cards de abajo
    });
})();