const API_URL = "http://localhost:3000/clientes";

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

const listar_clientes = () => {
    return request(API_URL);
};

const crearCliente = (nombre, email) => {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify({ nombre, email }),
    });
};

const eliminarCliente = (id) => {
    return request(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

const detalleCliente = (id) => {
    return request(`${API_URL}/${id}`);
};

const actualizarCliente = (nombre, email, id) => {
    return request(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre, email }),
    });
};

export const clientService = {
    listar_clientes,
    crearCliente,
    eliminarCliente,
    detalleCliente,
    actualizarCliente,
};
