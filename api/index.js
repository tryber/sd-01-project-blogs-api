const express = require('express');
const bodyParser = require('body-parser');

const userController = require('../application/user/userController');
const loginController = require('../application/login/loginController');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// app.use('/users', userController);
app.use('/login', loginController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
