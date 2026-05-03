import { petService } from "../service/animales-service.js";

const crearFilaMascota = async (nombre, edad, raza, peso, duenoId, id) => {
    const fila = document.createElement("tr");

    let informacionDueno = "Cargando...";
    try {
        const dueno = await petService.obtenerDueno(duenoId);
        informacionDueno = `${dueno.nombre} (${dueno.email})`;
    } catch (evento) {
        informacionDueno = "No encontrado";
    }

    const contenido = `
        <td class="td">${nombre}</td>
        <td>${edad}</td>
        <td>${raza}</td>
        <td>${peso}</td>
        <td>${informacionDueno}</td>
        <td>
            <ul class="table__button-control">
                <li>
                    <a
                        href="../screens/editar_aniamles.html?id=${id}"
                        class="simple-button simple-button--edit"
                    >
                    Editar
                    </a>
                </li>
                <li>
                    <button class="simple-button simple-button--delete" type="button" id="${id}">
                    Eliminar
                    </button>
                </li>
            </ul>
        </td>
    `;
    fila.innerHTML = contenido;

    const btn = fila.querySelector("button");
    btn.addEventListener("click", () => {
        const idMascota = btn.id;
        petService.eliminarMascota(idMascota).then(() => {
            alert("Mascota eliminada");
            window.location.reload();
        }).catch(() => alert("Error al eliminar"));
    });

    return fila;
};

const table = document.querySelector("[data-table-pets]");

petService.listaMascotas().then((data) => {
    data.forEach(async (pet) => {
        const nuevaFila = await crearFilaMascota(
            pet.nombre,
            pet.edad,
            pet.raza,
            pet.peso,
            pet.duenoId,
            pet.id
        );
        table.appendChild(nuevaFila);
    });
}).catch(() => alert("Error al cargar mascotas"));
