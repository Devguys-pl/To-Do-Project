const addTaskInpt = document.querySelector('.addTaskInpt');
const taskList = document.querySelector('.taskList');
const addTaskBtn = document.querySelector('.addTaskBtn');


const getTasksList = () => {
    fetch('http://localhost:3000/todo/list')
        .then(res => {
            if (res.status !== 200) {
                throw Error('Status isn`t 200')
            } else {
                return res.json()
            }

        })
        .then(json => showTask(json.todosList))
}


const showTask = (tasks) => {

    tasks.forEach(task => {
        // console.log(task);
        const singleTask = document.createElement('div');
        singleTask.classList.add('row');
        singleTask.innerHTML = `<div class="col-2">
        <button type="button" class="btn btn-light my-3 mx-4 completeBtn">✓</button></i>
    </div>
    <div class="col-8">
        <p class="my-4">${task.taskTitle}</p>
    </div>
    <div class="col-2 dots-icon">
        <i class="fa-solid fa-ellipsis p-2 m-3"></i>
    </div>`;
        taskList.appendChild(singleTask);


        //tutaj kod od navbaru
    })
}


getTasksList()


const completeBtn = document.querySelector('.completeBtn');
let isComplete = false;

let markTaskAsComplete = () => {
    isComplete = !isComplete;
    completeBtn.classList.toggle('checkedCompleteBtn');
}

completeBtn.addEventListener('click', markTaskAsComplete);