const saludar=()=>{
    console.log("funcion flecha")
};
saludar();

const duplica = numero=>{
    return numero*2;
};
console.log(duplica(5));

const suma =(a,b)=>{
   return a+b; 
};
console.log(suma(2,3));
///
const crearUsuario=(nombre,edad)=>({nombre:nombre,edad:edad});
console.log(crearUsuario("juan",28));
/////
const numero=[3,2,4,5,6,20]
//funcion para filttar

const procesarNumeros=(numero)=>{
    return numero
       .flilter(numero=>numero >10)
       .map(numero =>numero *2)
};

const resultado =procesarNumeros(numero);
console.log(resultado);
////
const usuarios=[
    {nombre:"Juan",edad:23},
    {nombre:"Luis",edad:33},
    {nombre:"Maris",edad:25},
    {nombre:"Felipe",edad:90},
     {nombre:"Santy",edad:43},
];
const procesarUsuarios=(usuarios)=>{
    return usuarios
    .flilter(usuarios =>usuarios.edad>18)//filtramos
    .map(usuarios=>{
        const{nombre}=usuarios;
        return nombre.length >5 ? nombre.toUpperCase() : nombre.toLowerCase();
    });
}
const result2=procesarUsuarios(usuarios);
console.log(result2);