const bodyParser = require('body-parser');
const express = require('express');
const { login, post } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', login);
app.use('/post', post);

module.exports = app;