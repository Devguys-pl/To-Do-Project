const addTaskInpt = document.querySelector('.addTaskInpt');
const taskList = document.querySelector('.taskList');
const addTaskBtn = document.querySelector('.addTaskBtn');

let addNewTask = () => {
    let taskValue = addTaskInpt.value;
    const singleTask = document.createElement('div');

    singleTask.classList.add('row');
    singleTask.innerHTML = `<div class="col-2">
    <button type="button" class="btn btn-light my-3 mx-4">✓</button></i>
</div>
<div class="col-8">
    <p class="my-4">${taskValue}</p>
</div>
<div class="col-2 dots-icon">
    <i class="fa-solid fa-ellipsis p-2 m-3"></i>
</div>`;
    taskList.appendChild(singleTask);
    addTaskInpt.value = "";
}

addTaskBtn.addEventListener('click', addNewTask);