const express = require('express');

const router = express.Router();

const BlogPostRepository = require('../../infrastructure/blog/BlogPostRepository');
const rescue = require('../../middleware/rescue');
const verifyPost = require('../../middleware/verifyPost');
const verifyJWT = require('../../middleware/verifyJWT');

const callPostPost = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.user;
  const conteiner = { title, content, userId };
  return BlogPostRepository.createPost(conteiner)
    .then(message => res.status(200).json({ message }))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(401).json({ message: error });
    });
};

const callGetPost = async (_req, res) =>
  BlogPostRepository.getAll()
    .then(response => res.status(200).json(response))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });

const callPutPostById = async (req, res) => {
  const { title, content } = req.body;
  const { id: userId } = req.params;
  const obj = { title, content, userId };
  return BlogPostRepository.updateBlog(obj)
    .then(response => res.status(200).json(response))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callGetPostById = async (req, res) => {
  const { id: userId } = req.params;
  return BlogPostRepository.getById(userId)
    .then(response => res.status(200).json(response))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callgetByQueryParams = async (req, res) => {
  const { q } = req.query;
  return BlogPostRepository.getByQuery(q)
    .then(msg => res.status(200).json(msg))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callDeletePost = async (req, res) => {
  const { id } = req.params;
  return BlogPostRepository.deletPostById(id)
    .then(msg => res.status(200).json(msg))
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

router.get('/search', verifyJWT, rescue(callgetByQueryParams));
router.post('/', verifyPost, verifyJWT, rescue(callPostPost));
router.get('/', verifyJWT, rescue(callGetPost));
router.put('/:id', verifyPost, verifyJWT, rescue(callPutPostById));
router.get('/:id', verifyJWT, rescue(callGetPostById));
router.delete('/:id', verifyPost, verifyJWT, rescue(callDeletePost));

module.exports = router;
