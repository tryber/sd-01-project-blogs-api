const express = require('express');
const bodyParser = require('body-parser');

const { user, login, post } = require('../controllers');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/user', user);
app.use('/login', login);
app.use('/post', post);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Ouvindo a porta ${PORT}`);
});
