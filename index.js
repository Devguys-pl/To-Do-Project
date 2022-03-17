require('dotenv').config();
const express = require('express');
const {
    urlencoded
} = require("express");
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const {
    pool
} = require('./utils/db');
// ******* UTILS *******
const {
    handleError
} = require("./utils/errors");
// ******* ROUTERS *******
const {
    todoRouter
} = require('./routers/todo');
const {
    userRouter
} = require('./routers/user');
// ******* MIDDLEWARES *******
// ******* EXPRESS CFG *******
const app = express();
// ******* APP.USE *******

app.use(express.urlencoded({
    extended: true,
}));
app.use(methodOverride('_method'));
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

// ******* EXPRESS-MYSQL-SESSION START *******


const MySQLStore = require('express-mysql-session')(session);
const sessionStore = new MySQLStore({
    expiration: 24 * 60 * 60 * 1000,
    createDatabaseTable: true,
    schema: {
        tableName: 'sessiontbl',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data',
        }
    }
}, pool);

app.use(session({
    key: 'process.env.EXPRESS_MYSQL_SESSION_KEY',
    secret: 'process.env.EXPRESS_MYSQL_SESSION_SECRET',
    store: sessionStore,
    resave: false,
    saveUninitialized: true
}));


// ******* EXPRESS-MYSQL-SESSION END *******


app.use('/todo', todoRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    const test = 1;
    if (test === 1) {
        res.sendFile('public/indedx.html', {
            root: __dirname
        });
    } else {
        res.sendFile('public/test.html', {
            root: __dirname
        });
    }

});

app.listen(3000, 'localhost', () => {
    console.log('App started http://localhost:3000')
});