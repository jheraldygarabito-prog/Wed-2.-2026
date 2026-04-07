const checkComplete=()=>{
        const i=document.createElement('i');
        i.classList.add('far','fa-check-square','icon');//estilos de iconos 
        i.addEventListener('click',color);
        return i;
    }
    const color =(evento)=>{//cambiamos de color el icono
        const element=evento.target;//me devuelve el elemento que se esta utilizando
        element.classList.toogle('fas');//agrega o quita la clase fas
        element.classList.toogle('completeIcon');
        element.classList.toogle('far');
        
    }
export default checkComplete;