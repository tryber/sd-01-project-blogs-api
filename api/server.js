const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/user', router.userRouter);
app.use('/login', router.loginRouter);
app.use('/post', router.blogPostRouter);

app.use('*', (_req, res) => res.status(404).json({ message: 'Página não encontrada' }));

module.exports = app;
