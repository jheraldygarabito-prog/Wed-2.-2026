const API_URL = "http://localhost:3000/mascota";
const CLIENTES_URL = "http://localhost:3000/clientes";

const request = async (url, options = {}) => {
    const respuesta = await fetch(url, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...options.headers,
        },
    });

    const text = await respuesta.text();
    const data = text ? JSON.parse(text) : null;

    if (!respuesta.ok) {
        throw new Error(data?.message ?? text ?? "Error");
    }

    return data;
};

const listaMascotas = () => {
    return request(API_URL);
};

const crearMascota = (nombre, edad, raza, peso, duenoId) => {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify({ nombre, edad, raza, peso, duenoId }),
    });
};

const eliminarMascota = (id) => {
    return request(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

const detalleMascota = (id) => {
    return request(`${API_URL}/${id}`);
};

const actualizarMascota = (nombre, edad, raza, peso, duenoId, id) => {
    return request(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre, edad, raza, peso, duenoId }),
    });
};

const obtenerDueno = (idDueno) => {
    return request(`${CLIENTES_URL}/${idDueno}`);
};

export const petService = {
    listaMascotas,
    crearMascota,
    eliminarMascota,
    detalleMascota,
    actualizarMascota,
    obtenerDueno,
};
