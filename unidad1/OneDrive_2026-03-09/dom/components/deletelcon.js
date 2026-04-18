 const deleteIcon=()=>{
        const i=document.createElement('i');
        i.classList.add('fas','fa-trash-alt','transition','icon');
        i.classList.Color='red'; 
        i.addEventListener('click',deleteTask);
        return i;

    }
    const deleteTask=(evento)=>{
        const parent=evento.target.parentElement;//me devuelve el elemento padre del elemento que se esta utilizando
        parent.remove();//remueve el elemento padre
    }
export default deleteIcon;