const express = require('express');
const rescue = require('../rescue');
const validateJWT = require('../middlewares/validateJWT');
const PostModel = require('../infrastructure/post');
const router = express.Router();

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  if (!title || !content)
    return res.status(500);
  const postCreated = await PostModel.createPost(title, content, email);
  return res.status(201).json(postCreated);
}

const getAllPosts = async (req, res) => {
  const posts = await PostModel.getAllPosts();
  return res.status(200).json(posts);
}

router.get('/', rescue(getAllPosts));
router.use(validateJWT);
router.post('/', rescue(createPost));

module.exports = router;
