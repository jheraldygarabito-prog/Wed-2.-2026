import checkComplete from './components/checkComplete.js';
import deleteIcon from './components/deletelcon.js';

(()=>{
    const btn = document.querySelector('[data-form-btn]');
    console.log(btn);

    const createTask=(evento)=>{
        evento.preventDefault();
        const input=document.querySelector('[data-form-input]');
        const value=input.value;//recupero el valor del input
        const list=document.querySelector('[data-list]');
        const task=document.createElement('li');
        task.classList.add('card');
        input.value='';
        const contTask=document.createElement('div');
        const titleTask=document.createElement('span');
        titleTask.classList.add('task');
        titleTask.innerText=value;     
        contTask.appendChild(checkComplete());//agrego el chent a el div
        contTask.appendChild(titleTask);

        task.appendChild(contTask);
        task.appendChild(deleteIcon());
        list.appendChild(task);
    }
    //cada vez
    //llamar a crear tarea 
     btn.addEventListener('click', createTask);
})();