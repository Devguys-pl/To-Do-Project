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
    res.json({data: todosList});
})




module.exports = {
    todoRouter,
};