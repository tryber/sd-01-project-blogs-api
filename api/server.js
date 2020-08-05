const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

const { validLoginMiddleware } = require('../middlewares/login');
const { deleteUserValid, createUserValid } = require('../middlewares/userValid');

const { getAllUser, createUser, login } = require('./routes');
const { UserById, deleteUser } = require('./routes');

const { listAllPosts, createPost } = require('./routes');

// User
app.get('/user/:id', UserById);
app.get('/user', getAllUser);

app.post('/user', createUserValid, createUser);
app.post('/login', validLoginMiddleware, login);

app.delete('/user/:id', deleteUserValid, deleteUser);

// Posts
app.get('/post', listAllPosts);

app.post('/post', createPost);

// 404
app.use('*', (_req, res) => res.status(404).json({ message: 'Página não encontrada' }));

module.exports = app;
