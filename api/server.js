const express = require('express');

const { validLoginMiddleware } = require('../middlewares/user/login');

const bodyParser = require('body-parser');

const { getAllUser, createUser, login } = require('./routes');
const { UserById, deleteUser } = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/user', getAllUser);
app.get('/user/:id', UserById);

app.post('/user', createUser);
app.post('/login', validLoginMiddleware, login);

app.delete('/user/:id', deleteUser);

module.exports = app;
