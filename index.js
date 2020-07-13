const express = require('express');
const bodyParser = require('body-parser');
const validToken = require('./middlewares/validToken');
const { getAllUsers } = require('./application/user/userController');
const { getAllPost, createPost } = require('./application/post/postController');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users/', getAllUsers);
app.use('/login/', require('./application/user/loginController'));
app.post('/post/', validToken, createPost);
app.get('/post/', getAllPost);

app.listen(3000, () => {
  console.log('App ouvindo a porta 3000!!');
}); 
