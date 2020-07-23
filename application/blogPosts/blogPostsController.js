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

const listTitlePosts = async (req, res, _next) => {
  const search = req.query.q;
  const listPosts = await new BlogPostRepository().getAllSearch(search);
  res.status(200).json(listPosts);
};

// const createPost = async (req, res) => {
//   const token = req.headers.authorization;
//   const { id } = verifyJWT(token);
//   const { title, content } = req.body;

//   const user = new BlogPost({ title, content, id });

//   const newUser = await new BlogPostRepository().create(user);

//   const token = createJWT(newUser);
//   res.status(201).json({ token });
// };

// const updatePost = async () => {}

const detailPostById = async (req, res, _next) => {
  const detailUser = await new BlogPostRepository().getById(req.params.id);
  res.status(200).json(detailUser);
};

// const detailPostByQueryString = async (req, res, _next) => {
//   const detailUser = await new BlogPostRepository().getById(req.params.id);
//   res.status(200).json(detailUser);
// };

// const deletePost = async (req, res) => {
//   await new BlogPostRepository().remove(req.params.id)
//   res.status(204).send();
// };

// router.post('/', createUserValid, emailAlreadyExist(createUser));

// router.use(authorizationValid);

router.get('/', rescue(listPosts));
router.get('/search', invalidQueryString(listTitlePosts));
router.get('/:id', rescue(detailPostById));
// router.delete('/:id', rescue(deletePost));

module.exports = { blogPostRouter: router };
