const express = require('express');
const rescue = require('../rescue');
const validateJWT = require('../middlewares/validateJWT');
const PostModel = require('../infrastructure/post');
const router = express.Router();

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { email } = req.user;
  if (!title || !content)
    return res.status(500).json({ message: 'Unauthorized' });
  const postCreated = await PostModel.createPost(title, content, email);
  return res.status(201).json(postCreated);
}

const getAllPosts = async (_req, res) => {
  const posts = await PostModel.getAllPosts();
  return res.status(200).json(posts);
}

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.params;
  const { email } = req.user;
  if (!title || !content)
    return res.status(500).json({ message: 'Missing Data' });
  const updatedPost = await PostModel.updatePost(title, content, email, id);
  if (!updatedPost) return res.status(500).json({ message: 'Unauthorized' });
  return res.status(200).json({ message: 'Post Updated!' });
}

const getPost = async (req, res) => {
  const { id } = req.params;
  const post = await PostModel.getPost(id);
  return res.status(200).json(post);
}

const deletePost = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  const { message, status } = await PostModel.deletePost(email, id);
  return res.status(status).json({ message });
}

const getBySearch = async (req, res) => {
  const search = req.query.q;
  const posts = await PostModel.getSearch(search);
  res.status(200).json(posts);
}

router.get('/', rescue(getAllPosts));
router.get('/search', rescue(getBySearch));
router.get('/:id', rescue(getPost));
router.use(validateJWT);

router.delete('/:id', rescue(deletePost));
router.put('/:id', rescue(updatePost));
router.post('/', rescue(createPost));

module.exports = router;
