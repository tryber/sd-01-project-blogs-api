const express = require('express');
const bodyParser = require('body-parser');
const validToken = require('./middlewares/validToken');
const { login } = require('./application/user/loginController');
const { getAllUsers, createUser, getOneUserById, deleteUser } = require('./application/user/userController');
const { getAllPost, createPost, updatePost, getOnePostById, getPostsByTerm, removePost } = require('./application/post/postController');
const app = express();

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/users/', getAllUsers);
app.post('/users/', createUser);
app.get('/users/:id', getOneUserById)
app.delete('/users/:id', validToken, deleteUser);
app.use('/login/', login);
app.post('/post/', validToken, createPost);
app.get('/post/', getAllPost);
app.put('/post/:id', validToken, updatePost);
app.get('/post/:id', getOnePostById);
app.get('/posts/search/', getPostsByTerm);
app.delete('/post/:id', validToken, removePost);

app.listen(3000, () => {
  console.log('App ouvindo a porta 3000!!');
}); 
