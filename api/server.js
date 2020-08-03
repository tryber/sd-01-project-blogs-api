const express = require('express');

const { validLoginMiddleware } = require('../middlewares/login');
const { deleteUserValid, createUserValid } = require('../middlewares/userValid');
const { authorizationValid } = require('../middlewares/authorizationValid');

const bodyParser = require('body-parser');

const { getAllUser, createUser, login } = require('./routes');
const { UserById, deleteUser } = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', createUserValid, createUser);
app.get('/user/:id', UserById);
app.post('/login', validLoginMiddleware, login);

app.use(authorizationValid);

app.get('/user', getAllUser);
app.delete('/user/:id', deleteUserValid, deleteUser);



module.exports = app;
