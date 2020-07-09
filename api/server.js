const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const router = require('../application/user/userController');

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use('/users', router);

module.exports = app;
