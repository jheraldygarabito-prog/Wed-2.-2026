const paisDestino="ecuador";
const paisesDisponibles = ["bolovia","ecuador","brasil"];
let edadPasajeros=17
let acompaniado=true;
let pasaporte=true;
let casado=false;

console.log (`verificamos si hay pasajes para ${paisDestino}`);
//A && B ||
if(paisesDisponibles.indexOf(paisDestino)>=-1 && 
   edadPasajeros >=18 && 
   pasaporte && 
   !casado){
    console.log
}
