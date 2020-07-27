const express = require('express');
const bodyParser = require('body-parser');
const { login } = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();
apiRoutes.post('/login', login);

app.use(apiRoutes);

module.exports = app;