const cuidades=new Array("Sucre","La Paz","Santa Cruz","Beni","pando","oruro");

//definir un array abreviada
const paises = ["bolovia","ecuador","brasil"];

let conteoCuidades = cuidades.length;
console.log(`el conteo total de las cuidades es ${conteoCuidades}`);
//ejercicios 
cuidades.shift();//eliminar mi primer elemento
console.log(cuidades);
cuidades.pop();//elimina el ultimo elemento
console.log(cuidades);

console.log(paises.join("-"))// unificar los elementos en una cadena de caracteres
console.log(paises.sort());