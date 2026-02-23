const datos =[
    {
        'pais': 'Bolivia',
        'precio':200
    },
    {
        'pais': 'Ecuador',
        'precio':500
    },
    {
        'pais': 'Brasil',
        'precio':900
    },
    {
        'pais': 'Venezuela',
        'precio':100
    },
    {
        'pais': 'Ecuador',
        'precio':200
    },
]
const presupusto =300;
let i=0;

let paisSeleccionado='';
do{
    if(datos[i].precio<=presupusto){
        paisSeleccionado=datos[i].pais;
    }
    i++;
}while(i<datos.length && paisSeleccionado=='')

    if(paisSeleccionado=='')
        console.log(`no existe pasajes disponibles`)
    else
        console.log(`puedes comprar pasaje`)
    