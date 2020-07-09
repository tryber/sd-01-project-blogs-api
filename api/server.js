const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cors = require('cors');

const userRouter = require('../application/user/userController');

const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.resolve(__dirname, '..', 'public')));

app.use('/', userRouter);

app.use('*', (_req, res) => res.status(404).json({ message: 'Página não encontrada' }));

module.exports = app;
