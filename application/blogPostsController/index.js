const express = require('express');
const router = express.Router();

const BlogPostRepository = require('../../infrastructure/blog/BlogPostRepository');
const rescue = require('../../middleware/rescue');
const verifyPost = require('../../middleware/verifyPost');

const callPostPost = async (req, res, next) => {
  const { title, content } = req.body;

  const {
    data: { idUser },
  } = req.user;

  const conteiner = { title, content, idUser };
  const Post = new BlogPostRepository();
  return Post.createPost(conteiner)
    .then(userResponse => {
      const message = userResponse;
      return res.status(200).json({ message });
    })
    .catch(error => {
      console.log('deu errado', error);
      res.status(401).json({ message: error });
    });
};

router.post('/', verifyPost, rescue(callPostPost));
