const valorPasaje=1000;
if(valorPasaje===1000){
    console.log('el paseje es correcto')
}
const paisDestino="ecuador";
const paisesDisponibles = ["bolovia","ecuador","brasil"];

let edadPasajeros=17
let acompaniado=true;

console.log(`pasaje para ${paisDestino}`);
if((paisesDisponibles.indexOf(paisDestino)>-1 && (edadPasajeros>=18)|| acompaniado)){
    console.log("pasaje disponible para venta")
}else{
    console.log("no se puede vendre pasaje")
}