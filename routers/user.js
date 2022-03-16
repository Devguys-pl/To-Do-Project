require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const userRouter = Router();


userRouter.get('/', (req, res, next) => {
    res.send('Test, router /user')
})


module.exports = {
    userRouter,
};