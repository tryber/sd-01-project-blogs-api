const PostMapper = require('./PostMapper');

const { Post } = require('../database/models');
const { User } = require('../database/models');

User.hasMany(Post, { foreignKey: 'id' })
Post.belongsTo(User, { foreignKey: 'userId' })


class PostRepository {
  async getAll() {
    const post = await Post.findAll({
      include: [User]
    });
    return post.map(PostMapper.toEntity);
  }

  async create(post, { id }) {
    const postData = { ...post, userId: id }
    console.log(postData)
    const newPost = await Post.create(PostMapper.toDatabase(postData));
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
