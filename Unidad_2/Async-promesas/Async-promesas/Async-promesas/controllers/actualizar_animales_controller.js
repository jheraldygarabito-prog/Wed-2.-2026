import { petService } from "../service/animales-service.js";
import { clientService } from "../service/client-service.js";

const formulario = document.querySelector("[data-form]");
const selectDueno = document.querySelector("[data-dueno-id]");

const cargarDuenos = async () => {
    const clientes = await clientService.listar_clientes();
    clientes.forEach(({ id, nombre, email }) => {
        const option = document.createElement("option");
        option.value = id;
        option.textContent = `${nombre} (${email})`;
        selectDueno.appendChild(option);
    });
};

const obtenerInformacion = async () => {
    const url = new URL(window.location);
    const id = url.searchParams.get("id");

    if (id === null) {
        window.location.href = "./error.html";
    }

    const nombre = document.querySelector("[data-nombre]");
    const edad = document.querySelector("[data-edad]");
    const raza = document.querySelector("[data-raza]");
    const peso = document.querySelector("[data-peso]");
    try {
        await cargarDuenos();
        const mascota = await petService.detalleMascota(id);
        nombre.value = mascota.nombre;
        edad.value = mascota.edad;
        raza.value = mascota.raza;
        peso.value = mascota.peso;
        selectDueno.value = mascota.duenoId;
    } catch (error) {
        window.location.href = "./error.html";
    }
};

obtenerInformacion();

formulario.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const url = new URL(window.location);
    const id = url.searchParams.get("id");
    const nombre = document.querySelector("[data-nombre]").value;
    const edad = document.querySelector("[data-edad]").value;
    const raza = document.querySelector("[data-raza]").value;
    const peso = document.querySelector("[data-peso]").value;
    const duenoId = selectDueno.value;

    petService.actualizarMascota(nombre, edad, raza, peso, duenoId, id).then(() => {
        window.location.href = "./edicion_concluida.html";
    });
});
