
const URL_SUPABASE = "https://qbmggmwqjlkdtnmslryh.supabase.co";
const SUPABASE_KEY = "sb_publishable_IyqD2WQUWUotagoVzIc25A_yZGGjQJ-9";
const table = "productos";
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};

const request = async(url, option = {}) => {
    const res = await fetch(url, { headers: HEADERS, ...option });
    const text = await res.text();
    const data = text && JSON.parse(text);

    if(!res.ok){
        const mensaje = data?.mensaje ?? data?.error?.message ?? text ?? 'Error';
        throw new Error(mensaje);
    }
    return data;
};

const listaProductos = () => 
    request(`${API_URL}?select=id,nombre,precio,descripcion`);

const crearProducto = (nombre, precio, descripcion) => {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify({ nombre, precio, descripcion, id: uuid.v4() })
    });
};

const eliminarProducto = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: "DELETE"
    });
};

const detalleProducto = (id) => 
    request(`${API_URL}?id=eq.${id}&select=id,nombre,precio,descripcion`)
    .then((data) => data?.[0] ?? Promise.reject(new Error('Producto no encontrado')));

const actualizarProducto = (nombre, precio, descripcion, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre, precio, descripcion })
    });
};

export const productoService = {
    listaProductos,
    crearProducto,
    eliminarProducto,
    detalleProducto,
    actualizarProducto,
};