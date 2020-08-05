const { getAllUser, createUser, login } = require('../application/user/userController');
const { UserById, deleteUser } = require('../application/user/userController');
const { listAllPosts, createPost } = require('../application/blogPost/blogPostsController');

module.exports = {
  getAllUser,
  createUser,
  login,
  UserById,
  deleteUser,
  listAllPosts,
  createPost,
};
