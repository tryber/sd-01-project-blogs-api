const bodyParser = require('body-parser');
const express = require('express');
const { login, post, user } = require('./routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/login', login);
app.use('/post', post);
app.use('/user', user);

module.exports = app;