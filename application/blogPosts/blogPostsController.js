const express = require('express');

const BlogPostRepository = require('../../infrastructure/blogPosts/BlogPostRepository');
const BlogPost = require('../../domain/blogPost');
const { authorizationValid } = require('../../middlewares/authorizationValid');
const { rescue, invalidQueryString } = require('../../middlewares/customErrorTratament');

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

  res.status(201).json({ message: 'Post criado com sucesso!'});
};

const updatePost = async (req, res, _next) => {
  const { title, content } = req.body;
  const id = req.params.id;
  const userId = req.payload.id;

  // const post = new BlogPost({ title, content, user_id: id });
  const post = { title, content, user_id: userId, id  };

  const updatePost = await new BlogPostRepository().update(post);

  res.status(200).json(updatePost);
}

const detailPostById = async (req, res, _next) => {
  const detailPost = await new BlogPostRepository().getById(req.params.id);
  res.status(200).json(detailPost);
};

const deletePost = async (req, res) => {
  const id = req.params.id;
  const userId = req.payload.id;

  await new BlogPostRepository().removePost({ id, userId });

  res.status(200).send({ message: 'removido com sucesso'});
};

router.use(authorizationValid);

router.get('/', rescue(listPosts));
router.get('/search', invalidQueryString(listSearchPosts));

router.post('/', createPost);

router.get('/:id', rescue(detailPostById));
router.delete('/:id', rescue(deletePost));
router.put('/:id', rescue(updatePost));

module.exports = { blogPostRouter: router };
