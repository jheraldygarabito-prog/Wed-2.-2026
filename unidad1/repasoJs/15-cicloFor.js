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

for(i=0; i< datos.length; i++){
    if(datos[i].precio <= presupusto){
        console.log(`error, ${datos[i].pais}es demaciado caro`);
    }
    else{
        console.log(`error, ${datos[i]} es caro`)
    }
}