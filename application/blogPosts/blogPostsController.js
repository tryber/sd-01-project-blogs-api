const express = require('express');

const BlogPostRepository = require('../../infrastructure/blogPosts/BlogPostRepository');
const BlogPost = require('../../domain/blogPost');
const { authorizationValid } = require('../../middlewares/authorizationValid');
const { rescueBlogPost } = require('../../middlewares/customErrorTratament');
const { setPostValid } = require('../../middlewares/blogPostValid');

const router = express.Router();

const listPosts = async (_req, res, _next) => {
  const listPosts = await new BlogPostRepository().getAll();
  res.status(200).json(listPosts);
};

const listSearchPosts = async (req, res, _next) => {
  const search = req.query.q;
  const listPosts = await new BlogPostRepository().getAllSearch(search);
  res.status(200).json(listPosts);
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  const { id } = req.payload;

  const post = new BlogPost({ title, content, user_id: id });

  await new BlogPostRepository().create(post);

  res.status(201).json({ message: 'Post criado com sucesso!' });
};

const updatePost = async (req, res, _next) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const userId = req.payload.id;

  const post = { title, content, user_id: userId, id };
  await new BlogPostRepository().update(post);

  res.status(200).json({ message: 'Post atualizado com sucesso!' });
}

const detailPostById = async (req, res, _next) => {
  const detailPost = await new BlogPostRepository().getById(req.params.id);
  res.status(200).json(detailPost);
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.payload.id;

  console.log('chegou aqui')

  await new BlogPostRepository().removePost({ id, userId });

  res.status(200).send({ message: 'Post removido com sucesso!' });
};

router.get('/', rescueBlogPost(listPosts));
router.get('/search', rescueBlogPost(listSearchPosts));
router.get('/:id', rescueBlogPost(detailPostById));

router.use(authorizationValid);

router.post('/', setPostValid, rescueBlogPost(createPost));
router.delete('/:id', rescueBlogPost(deletePost));
router.put('/:id', setPostValid, rescueBlogPost(updatePost));

module.exports = { blogPostRouter: router };
