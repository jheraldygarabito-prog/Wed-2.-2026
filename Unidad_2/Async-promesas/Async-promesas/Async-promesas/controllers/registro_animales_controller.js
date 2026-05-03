import { petService } from "../service/animales-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form-pet]");
const selectDueno = document.querySelector("[data-dueno-id]");

const cargarDuenos = async () => {
    try {
        const clientes = await clientService.listar_clientes();
        clientes.forEach(({ id, nombre, email }) => {
            const option = document.createElement("option");
            option.value = id;
            option.textContent = `${nombre} (${email})`;
            selectDueno.appendChild(option);
        });
    } catch (error) {
        alert("Error al cargar clientes");
        console.log(error);
    }
};

cargarDuenos();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoId = selectDueno.value;

    petService.crearMascota(nombre, edad, raza, peso, duenoId)
        .then(() => {
            window.location.href = "./registro_completado.html";
        })
        .catch((err) => {
            alert("Hubo un error al guardar la mascota.");
            console.log(err);
        });
});
