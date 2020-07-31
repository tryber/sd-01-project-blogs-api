const { loginRouter } = require('../application/user/loginController');
const { userRouter } = require('../application/user/userController');
const { blogPostRouter } = require('../application/blogPosts/blogPostsController');

module.exports = {
  loginRouter,
  userRouter,
  blogPostRouter,
}
