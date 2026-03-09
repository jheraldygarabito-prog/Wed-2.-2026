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
const buscarMayorDe30 = (lista) => {
    let i = 0;

    do {
        console.log("Revisando a: " + lista[i].nombre);
        i++;
    } while (lista[i-1].edad <= 30); // Se repite MIENTRAS la edad sea 30 o menos

    console.log("¡Encontrado!");
};

buscarMayorDe30(usuarios);