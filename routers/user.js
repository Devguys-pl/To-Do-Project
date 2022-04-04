require('dotenv').config();
const {Router} = require('express');
const {UserRecord} = require("../records/user.record");
const {TodoRecord} = require("../records/todo.record");
const {URLSearchParams} = require('url');
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const userRouter = Router();

userRouter.get('/session', async (req, res) => {
    console.log(req.session.user)
});



userRouter.post('/create', async (req, res) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0){
        return res.status(400).send('Please insert requested information.')
    }
    const results = await UserRecord.getOneByEmail(req.body.email);
    const user = results[0];
    try{
        if (typeof user === "undefined") {
            const newUser = new UserRecord(req.body);
            const hash = await bcrypt.hash(req.body.password, 10);
            await newUser.create(hash);
            return res.status(200).send('User was created')
        } else {
            return res.status(400).send('User exist, change your e-mail!')
        }

    } catch (e){
        return res.status(400).send(`
         Something wrong, please try again 
        `)
    }

})

userRouter.post('/login', async (req, res) => {
    if (req.body.email.length <= 0 || req.body.password.length <= 0){
        return res.status(400).send('Please insert requested information.')
    }
    const results = await UserRecord.loginCheck(req.body.email);
    const user = results[0];
    try {
        const check = await bcrypt.compare(req.body.password, results[0].password);
        if (check) {
            req.session.user = {
                id: user.id
            }
            return res.status(400).send(`Success Login, welcome!:  ${user.email}`)
            console.log(req.session)
            console.log(req.session.user)

        } else {
            return res.status(400).send('Wrong password or e-mail.')
        }
    } catch(e){
        console.log(e);
        return res.status(400).send('The user does not exist.')

    }
})




module.exports = {
    userRouter,
};