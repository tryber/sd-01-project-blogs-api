const BlogPostMapper = require('./BlogPostMapper');

const { BlogPosts } = require('../database/models');

class BlogPostRepository {
    async getAll() {
      const posts = await BlogPosts.findAll();
      return posts.map(BlogPostMapper.toEntity);
    }
  
    // async _getByEmail(email) {
    //   try {
    //     return await posts.findOne({
    //       where: {
    //         email,
    //       },
    //     });
    //   } catch (error) {
    //     if (error.name === 'SequelizeEmptyResultError') {
    //       const notFoundError = new Error('NotFoundError');
    //       notFoundError.details = `posts com identificador ${email} não foi encontrado.`;
  
    //       throw notFoundError;
    //     }
  
    //     throw error;
    //   }
    // }
  
    async createPost(post) {
      const posts = await BlogPosts.create(BlogPostMapper.toDatabase(post));
      return BlogPostMapper.toEntity(posts)
    }
    
  }
  
  module.exports = BlogPostRepository;