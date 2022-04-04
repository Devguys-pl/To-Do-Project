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
        singleTask.innerHTML = `<div class="col-1">
        <a href="/todo/${task.id}/activation" id="${task.id}" class="btn btn-light my-3 mx-4 completeBtn">✓</a>
    </div>
    <div class="col-2">
        <p class="my-4 createdAt">${task.createdAt}</p>
    </div>    
    <div class="col-8">
        <p class="my-4">${task.taskTitle}</p>
    </div>
    <div class="col-1 dots-icon">
        <i class="fa-solid fa-ellipsis p-2 m-3"></i>
    </div>`;
        taskList.appendChild(singleTask);


        const completeBtn = document.getElementById(task.id);

        let markTaskAsComplete = () => {
            if (task.status !== "Active") {
                completeBtn.classList.toggle('checkedCompleteBtn');
            }

        }

        completeBtn.addEventListener('click', markTaskAsComplete);



    })
}


getTasksList()