const paisDestino="ecuador";
const paisesDisponibles = ["bolovia","ecuador","brasil"];
let edadPasajeros=17
let acompaniado=true;

console.log(`pasaje para ${paisDestino}`);
if(paisesDisponibles.indexOf(paisDestino)>-1){
   if((paisesDisponibles.indexOf(paisDestino)>-1 && (edadPasajeros>=18)|| acompaniado)){
    console.log("pasaje disponible para venta")
    if(saldoPasajero >= valorPasaje){
        console.log("venta exitosa Pasaje emitido " + paisDestino);
    }else{
        console.log("saldo insuficiente ")
    }
   }else{
    console.log("no se puede vendre pasaje")
   }
}