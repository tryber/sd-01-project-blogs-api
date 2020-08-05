const BlogPostMapper = require('./BlogPostMapper');

const { BlogPost } = require('../database/models');
const { User } = require('../database/models');

class BlogPostRepository {
  async getAll() {
    const posts = await BlogPost.findAll({ include: [User] });

    return posts.map(BlogPostMapper.toEntity);
  }

  async create(post) {
    const { valid, errors } = post.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const { dataValues } = await BlogPost.create(BlogPostMapper.toDatabase(post));
    return dataValues;
  }
}

module.exports = BlogPostRepository;
