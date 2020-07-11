const express = require('express');

const BlogPostRepository = require('../../infrastructure/blogPosts/BlogPostRepository');
const BlogPost = require('../../domain/blogPost');
const { authorizationValid } = require('../../middlewares/authorizationValid');
const { emailAlreadyExist, rescue } = require('../../middlewares/rescue')

const router = express.Router();

const listPosts = async (_req, res, _next) => {
  const listPosts = await new BlogPostRepository().getAll();
  res.status(200).json(listPosts);
};

// const createPost = async (req, res) => {
//   const { displayName, email, image, password } = req.body;

//   const user = new BlogPost({ displayName, email, image, password });

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

const deletePost = async (req, res) => {
  await new BlogPostRepository().remove(req.params.id)
  res.status(204).send();
};

// router.post('/', createUserValid, emailAlreadyExist(createUser));

// router.use(authorizationValid);

router.get('/', rescue(listPosts));
router.get('/:id', rescue(detailPostById));
router.delete('/:id', rescue(deletePost));

module.exports = { blogPostRouter: router };
