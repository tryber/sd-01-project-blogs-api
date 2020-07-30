const express = require('express');

const { validLoginMiddleware } = require('../middlewares/user/login');

const bodyParser = require('body-parser');

const { getAllUser, createUser, login } = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/user', getAllUser);

app.post('/user', createUser);
app.post('/login', validLoginMiddleware, login);

module.exports = app;
