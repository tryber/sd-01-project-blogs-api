const BlogPostMapper = require('./BlogPostMapper');

const { BlogPost } = require('../database/models');
const { User } = require('../database/models');

User.hasMany(BlogPost, { foreignKey: 'id' });
BlogPost.belongsTo(User, { foreignKey: 'user_id' });

class BlogPostRepository {
  async getAll() {
    const posts = await BlogPost.findAll({
      include: [User],
    });

    return posts.map(BlogPostMapper.toEntity);
  }

  async create(posts) {
    const { valid, errors } = posts.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const { dataValues } = await BlogPost.create(BlogPostMapper.toDatabase(posts));
    return dataValues;
  }

  async _getById(id) {
    try {
      return await BlogPost.findByPk(id, { include: [User] }, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') throw new Error('Post não encontrado');
      throw error;
    }
  }

  async getById(id) {
    const post = await this._getById(id);

    return BlogPostMapper.toEntity(post);
  }

  async remove(id) {
    const post = await this._getById(id);

    await post.destroy();
    return;
  }  
}

module.exports = BlogPostRepository;
