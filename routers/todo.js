require('dotenv').config();
const {
    Router
} = require('express');
const {
    UserRecord
} = require("../records/user.record");
const {
    TodoRecord
} = require("../records/todo.record");
const {
    URLSearchParams
} = require('url');
const todoRouter = Router();


todoRouter.get('/', (req, res, next) => {
    res.send('Test, router /todo')
})

todoRouter.get('/list', async (req, res) => {
    const todosList = await TodoRecord.listAll();
    res.json({
        todosList: todosList
    });
})

todoRouter.post('/create', async (req, res) => {
    const newTask = new TodoRecord(req.body)
    await newTask.create()
    res.redirect('http://localhost:3000/')
})

todoRouter.get('/:id/activation', async (req, res) => {
    if (typeof req.url.split('/')[1] === "string") {
        try {
            const results = await TodoRecord.getOneById(req.url.split('/')[1]);
            const todo = results[0];
            if (todo.id === req.url.split('/')[1]) {
              if (todo.status !== "Active") {
                const status = "Active"
                await TodoRecord.getOneByIdAndChangeStatus(todo.id, status)
              } else if(todo.status !== "Completed") {
                const status = 'Completed';
                await TodoRecord.getOneByIdAndChangeStatus(todo.id, status)
              }
                return res.status(200).json({
                    Status: todo.status,
                    Id: todo.id,
                })
            } else {
                return res.status(400).send('Something wrong')
            }
        } catch (e) {
            console.log(e)
        }
    }
})



module.exports = {
    todoRouter,
};
