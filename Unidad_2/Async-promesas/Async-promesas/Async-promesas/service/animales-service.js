
const listaMascotas = () => 
    fetch("http://localhost:3000/mascota").then(respuesta => respuesta.json());

const crearMascota = (nombre, edad, raza, peso, dueñoId) => {
    return fetch("http://localhost:3000/mascota", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, dueñoId, id: uuid.v4() })
    });
};

const eliminarMascota = (id) => {
    return fetch(`http://localhost:3000/mascota/${id}`, {
        method: "DELETE"
    });
};

const detalleMascota = (id) => 
    fetch(`http://localhost:3000/mascota/${id}`).then(respuesta => respuesta.json());

const actualizarMascota = (nombre, edad, raza, peso, dueñoId, id) => {
    return fetch(`http://localhost:3000/mascota/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, edad, raza, peso, dueñoId })
    });
};

const obtenerDueño = (idDueño) => 
    fetch(`http://localhost:3000/perfil/${idDueño}`).then(respuesta => respuesta.json());

export const petService = {
    listaMascotas,
    crearMascota,
    eliminarMascota,
    detalleMascota,
    actualizarMascota,
    obtenerDueño
};
