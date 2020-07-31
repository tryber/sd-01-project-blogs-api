const { Op } = require('sequelize');
const PostMapper = require('./PostMapper');

const { Post } = require('../database/models');
const { User } = require('../database/models');
const { handleError } = require('../../manager/handleError');

User.hasMany(Post, { foreignKey: 'id' });
Post.belongsTo(User, { foreignKey: 'userId' });

class PostRepository {
  async getAll() {
    const post = await Post.findAll({
      include: [User]
    });
    return post.map(PostMapper.toEntity);
  }

  async create(post, { id }) {
    const postData = { ...post, userId: id };
    const newPost = await Post.create(PostMapper.toDatabase(postData));
    return PostMapper.toEntity(newPost);
  }

  async isFromUser(id, post) {
    if (post.userId === id) handleError({ name: 'unauthorized' });
    return true;
  }

  async remove(id, idUser) {
    const post = await this._getById(id);
    this.isFromUser(idUser, id);
    await post.destroy();
    return;
  }

  async _getById(id) {
    try {
      return await Post.findByPk(
        id, { include: [User] },
        { rejectOnEmpty: true });
    } catch (error) {
      handleError(error)
    }
  }

  async _getByTerm(term) {
    try {
      return await Post.findAll({
        include: [User],
        where: {
          [Op.or]: [{
            title: { [Op.regexp]: term }
          },
          {
            content: { [Op.regexp]: term }
          }],
        },
        rejectOnEmpty: true
      });
    } catch (error) {
      handleError(error)
    }
  }

  async _update(id, postData) {
    try {
      return await Post.update(
        PostMapper.toDatabase(postData),
        { where: { id } }
      )
    } catch (error) {
      handleError(error)
    }
  }

  async update(id, postData) {
    await this._update(id, postData);
    const data = await this._getById(id);
    return PostMapper.toEntity(data);
  }

  async getById(id) {
    const post = await this._getById(id);

    return PostMapper.toEntity(post);
  }

  async getByTerm(term) {
    const post = await this._getByTerm(term);

    return post.map(PostMapper.toEntity);
  }
}

module.exports = PostRepository; 
