const express = require('express');

const bodyParser = require('body-parser');

const { getAllUser, createUser } = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/user', getAllUser);
app.post('/user', createUser);

module.exports = app;
