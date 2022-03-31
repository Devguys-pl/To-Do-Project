require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const todoRouter = Router();


todoRouter.get('/', (req, res, next) => {
    res.send('Test, router /todo')
})

todoRouter.get('/list', async (req, res) => {
    const todosList = await TodoRecord.listAll();
    res.json({todosList: todosList});
})

todoRouter.post('/create', async (req, res) => {
    const newTask = new TodoRecord(req.body)
    await newTask.create()
})



module.exports = {
    todoRouter,
};