const BlogPostRepository = require('../infrastructure/blogPosts/BlogPostRepository');

exports.removeUserAndPosts = async (payload) => {
  try {
    return new BlogPostRepository().removeAllPost(payload);
  } catch (err) {
    console.log(err.message);
    throw err;
  }
}
