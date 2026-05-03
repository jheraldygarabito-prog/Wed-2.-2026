const URL_SUPABASE = "https://qbmggmwqjlkdtnmslryh.supabase.co";
const SUPABASE_KEY = "sb_publishable_IyqD2WQUWUotagoVzIc25A_yZGGjQJ-9";
const table = "mascota";
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;
const TABLE_CLIENTES = `${URL_SUPABASE}/rest/v1/clientes`;

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

const listaMascotas = () => 
    request(`${API_URL}?select=id,nombre,edad,raza,peso,duenoId`);

const crearMascota = (nombre, edad, raza, peso, duenoId) => {
    return request(API_URL, {
        method: "POST",
        body: JSON.stringify({ nombre, edad, raza, peso, duenoId, id: uuid.v4() })
    });
};

const eliminarMascota = (id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: "DELETE"
    });
};

const detalleMascota = (id) => 
    request(`${API_URL}?id=eq.${id}&select=id,nombre,edad,raza,peso,duenoId`)
    .then((data) => data?.[0] ?? Promise.reject(new Error('Mascota no encontrada')));

const actualizarMascota = (nombre, edad, raza, peso, duenoId, id) => {
    return request(`${API_URL}?id=eq.${id}`, {
        method: "PATCH",
        body: JSON.stringify({ nombre, edad, raza, peso, duenoId })
    });
};

const obtenerDueno = (idDueno) => 
    request(`${TABLE_CLIENTES}?id=eq.${idDueno}&select=id,nombre,email`)
    .then((data) => data?.[0] ?? Promise.reject(new Error('Dueno no encontrado')));

export const petService = {
    listaMascotas,
    crearMascota,
    eliminarMascota,
    detalleMascota,
    actualizarMascota,
    obtenerDueno
};
