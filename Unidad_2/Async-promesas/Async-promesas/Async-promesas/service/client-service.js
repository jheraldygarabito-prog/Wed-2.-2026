//recepcion de datos
/*const crearFila = (nombre,email) =>{
     const fila = document.createElement('tr');//creamos nueva fila
     //html como variable
     const contenido = `
    <td class="td" data-td>
      ${nombre}
    </td>
    <td>${email}</td>
    <td>
      <ul class="table__button-control">
        <li>
          <a
            href="../screens/editar_cliente.html"
            class="simple-button simple-button--edit"
          >
            Editar
          </a>
        </li>
        <li>
          <button class="simple-button simple-button--delete" type="button">
            Eliminar
          </button>
        </li>
      </ul>
    </td>
`;
    fila.innerHTML = contenido;
    return fila;
}*/

/*
const listar_clientes = () =>{//metodo antiguo
    const promesa = new Promise ((resolve,reject)=>{
        const http = new XMLHttpRequest();//VARIABLE PARA REQUEST CON HTTTP
        http.open("GET","http://localhost:3000/perfil")
        http.send();
        http.onload =()=>{
            const response = JSON.parse(http.response)
            if(http.response >= 400){
                reject(response)
            }else
                resolve(response)
        }
    })
    return promesa;
}
listar_clientes().then((data)=>{
    data.forEach((perfil) => {
        const nuevafila = crearFila(perfil.nombre,perfil.email);
        table.appendChild(nuevafila)
    });
})
.catch((error)=>alert("No existe conexion"));
*/
 //------optimizado------//

// client-service.js

// --- CLIENTES ---
/*
const listar_clientes = () => 
    fetch("http://localhost:3000/perfil")
    .then((respuesta) => respuesta.json());

const crearCliente = (nombre, email) => {
    return fetch("http://localhost:3000/perfil", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email, id: uuid.v4() })
    });
};

const eliminarCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "DELETE"
    });
};

const detalleCliente = (id) => {
    return fetch(`http://localhost:3000/perfil/${id}`)
    .then((respuesta) => respuesta.json());
};

const actualizarCliente = (nombre, email, id) => {
    return fetch(`http://localhost:3000/perfil/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nombre, email }) 
    })
    .then((respuesta) => respuesta)
    .catch((err) => console.log(err));
};
*/
//-------Con mysql--------//
/* const API_BASE_URL = "http://localhost/api/conexion.php";

const listarClientes =()=>{
    return fetch(API_BASE_URL).then(response=>{
        if(!response.ok)throw new Error('error clientes');
        return response.json();
    })
}

const crearCliente = (nombre, email) => {
    return fetch(API_BASE_URL ,{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email, id:uuid.v4()}) //esta linea envia nom
    }).then(response=>{
        if(!response.ok)throw new Error('error crear cliente');
        return response.json();
    })
};

const actualizarCliente =(nombre, email, id) =>{ 
    return fetch(API_BASE_URL,{
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({nombre,email, id})
    }).then(response=>console.log(response)).catch((error)=> console.log(error));

}

const eliminarCliente = (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`,{
        method: "DELETE"
    });
    
    //.then((response)=>response.json())
};

const cliente= (id) =>{
    return fetch(`${API_BASE_URL}?id=${id}`).then((response)=>response.json());
}
    */

/////////////-----------con supabase-----------//////////

const URL_SUPABASE = "https://qbmggmwqjlkdtnmslryh.supabase.co";
const SUPABASE_KEY = "sb_publishable_IyqD2WQUWUotagoVzIc25A_yZGGjQJ-9";
const table = "clientes";
const API_URL = `${URL_SUPABASE}/rest/v1/${table}`;

const HEADERS = {
    'apikey': SUPABASE_KEY,
    'Authorization': `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
    'Prefer': 'return=representation'
};
//evita q cada fechs tenga q escribir los headers en cada funcion, se puede usar en cada funcion sin necesidad de escribirlo
const request = async(url,option ={})=>{
    const res = await fetch({url,headers: HEADERS,...option});//el ...option es para que se puedan agregar otras opciones como el method o el body sin necesidad de escribir los headers cada vez
    const text = await res.text();//el text es para que se pueda leer el error en caso de que no sea un json, ya que si no es un json no se puede parsear y se pierde la informacion del error
    const data = text && JSON.parse(text);null//el data es para que se pueda parsear el json en caso de que sea un json, ya que si no es un json no se puede parsear y se pierde la informacion del error

    if(!res.ok){
        const mensaje = data?.mensaje ?? data?.error?.message ?? text?? 'Error';
        throw new Error(mensaje);
    }
}

////---------/////////
//get

const listar_clientes = () =>{
    request(`${API_URL}?select=Id,Nombre,Email`);
}
//get x id 
const Cliente=()=>{
    request(`${API_URL}?id=eq.${id}&select=Id,Nombre,Email`).then((data)=>data?.[0] ?? Promise.reject(new Error('No se encontró el cliente')));//

}

//post
const crearCliente = (nombre,email) =>{
    request(API_URL,{
        method: "POST",
        body: JSON.stringify({nombre,email})
    }).then((data)=>data?.[0]);
}

//patch
const actualizarCliente = (id,email,nombre) =>{
    request(`${API_URL}?id=eq.${id}`,//para actualizar por id
    {
        method: "PATCH",
        body: JSON.stringify({nombre,email})//para actualizar por id
    }).then((data)=>data?.[0] ?? Promise.reject(new Error('No se pudo actualizar')));//para actualizar por id
}

//delete
const eliminarCliente = (id) =>{
    request(`${API_URL}?id=eq.${id}`,{
        method: "DELETE"
    }).then((data)=>data?.[0] ?? Promise.reject(new Error('No se pudo eliminar')));//para eliminar por id
}



export const clientService = {
    listar_clientes,
    crearCliente,
    eliminarCliente,
    detalleCliente, 
    actualizarCliente,
};