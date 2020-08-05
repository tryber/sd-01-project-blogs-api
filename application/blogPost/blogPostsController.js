const BlogPostRepository = require('../../infrastructure/blogPost/BlogPostRepository');
const { tokenValid } = require('../../services/jwt');
const BlogPost = require('../../domain/blogPost');
// const { authorizationValid } = require('../../middlewares/authorizationValid');

exports.listAllPosts = async (_req, res) => {
  const listPosts = await new BlogPostRepository().getAll();
  res.status(200).json(listPosts);
};

exports.createPost = async (req, res) => {
  const { title, content } = req.body;
  const payload = tokenValid(req.headers.authorization);

  const post = new BlogPost({ title, content, user_id: payload.id });

  await new BlogPostRepository().create(post);

  res.status(201).json({ message: 'Post criado com sucesso!' });
};
