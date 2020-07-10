const express = require('express');

const bodyParser = require('body-parser');

// const router = require('./routes');

const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/user', require('../application/user/userController'));

module.exports = app;
