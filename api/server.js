const express = require('express');
const bodyParser = require('body-parser');
const { user, login, post } = require('./router');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const apiRoutes = express.Router();
apiRoutes.post('/user', user);
apiRoutes.post('/login', login);
apiRoutes.post('/post', post);

app.use(apiRoutes);

module.exports = app;