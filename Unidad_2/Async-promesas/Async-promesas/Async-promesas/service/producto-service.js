const API_URL = "http://localhost:3000/productos";

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

const listaProductos = () => {
    return request(API_URL);
};

const crearProducto = (nombre, precio, descripcion) => {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify({ nombre, precio, descripcion }),
    });
};

const eliminarProducto = (id) => {
    return request(`${API_URL}/${id}`, {
        method: "DELETE",
    });
};

const detalleProducto = (id) => {
    return request(`${API_URL}/${id}`);
};

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return request(`${API_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre, precio, descripcion }),
    });
};

export const productoService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};
