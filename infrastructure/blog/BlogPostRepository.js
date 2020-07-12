const UserMapper = require('./UserMapper');

const { Post } = require('../database/models');

class BlogPostRepository {
    async getAll() {
      const posts = await Post.findAll();
      return posts.map(UserMapper.toEntity);
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
      // const posts = await this._getByEmail(email);
      return UserMapper.toDatabase(post);
    }
    
  }
  
  module.exports = BlogPostRepository;