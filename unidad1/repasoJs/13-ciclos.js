const paisesDisponibles = ["bolovia","ecuador","brasil","venezuela","italia","francia"];
const preciosPaises= new Array(100,200,300,400,500,600);
const presupusto=250;

let i =0;

while(preciosPaises [i]>presupusto && i < paisesDisponibles.length){
    i++;
}
if(i==paisesDisponibles.length){
    console.log(`no existe pasaje`)
}else{
    console.log(`puedes comprar el pasaje`)
}