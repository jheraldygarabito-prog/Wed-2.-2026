const paisDestino="ecuador";
const paisesDisponibles = ["bolovia","ecuador","brasil","venezuela","italia","francia"];
let valorPasaje=0;
/*
if(paisDestino == "bolivia"){
    valorPasaje=100;
} else if (paisDestino =="ecuador"){
    valorPasaje=200;
}*/
switch(paisDestino){
    case "bolivia":
        valorPasaje=500;
        break;
    case "ecuador":
        valorPasaje=100;
        break;
    case "brasil":
        valorPasaje=300;
        break;
    case "venezuela":
        valorPasaje=500;
        break;    
    default:
        console.log(`no existe pasajes para esa ciudad`)
        break;
}
if (valorPasaje>0)
    console.log(`el valor del pasaje es ${valorPasaje}`)