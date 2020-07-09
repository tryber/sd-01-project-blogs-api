const PostMapper = require('./PostMapper');

const { Post } = require('../database/models');

class PostRepository {
  async getAll() {
    const post = await Post.findAll({
      where: {
        isVisible: true,
      },
    });

    return post.map(PostMapper.toEntity);
  }
  async create(post) {
    const newPost = await Post.create(PostMapper.toDatabase(post));
    return PostMapper.toEntity(newPost);
  }
  async remove(id) {
    const post = await this._getById(id);

    await post.destroy();
    return;
  }
  async _getById(id) {
    try {
      return await Post.findByPk(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Post com identificador ${id} não foi encontrado.`;

        throw notFoundError;
      }

      throw error;
    }
  }
  async getById(id) {
    const post = await this._getById(id);

    return PostMapper.toEntity(post);
  }
}

module.exports = PostRepository; 
