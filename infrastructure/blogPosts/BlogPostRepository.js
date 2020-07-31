const { Op } = require('sequelize');

const BlogPostMapper = require('./BlogPostMapper');

const { BlogPost } = require('../database/models');
const { User } = require('../database/models');

class BlogPostRepository {
  async getAll() {
    const posts = await BlogPost.findAll({
      include: [User],
    });

    return posts.map(BlogPostMapper.toEntity);
  }

  async _getAllSearch(search) {
    const posts = await BlogPost.findAll({
      include: [User],
      where: {
        [Op.or]: [{
          title: {
            [Op.regexp]: search,
          }
        },
        {
          content: {
            [Op.regexp]: search,
          }
        }],
      },
    });

    return posts;
  }

  async getAllSearch(search) {
    const posts = await this._getAllSearch(search);

    return posts.map(BlogPostMapper.toEntity);
  }

  async _getById(id) {
    const post = await BlogPost.findByPk(id, { include: [User] });
    if (!post) throw new Error('SequelizePostNotFound');
    return post;
  }

  async getById(id) {
    const post = await this._getById(id);

    return BlogPostMapper.toEntity(post);
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

  async _updatePost({ title, content, user_id, id }) {
    const postId = await BlogPost.findOne({ where: { id } });
    if (!postId) throw new Error('SequelizePostNotFound');

    const updatePost = await BlogPost.update(
      BlogPostMapper.toDatabase({ title, content }),
      { where: { id, user_id } },
    );
    if (updatePost[0] === 0) throw new Error('SequelizePostAcessNotValid');
    return updatePost;
  }

  async update(post) {
    const updatePost = await this._updatePost(post);

    return updatePost;
  }

  async _removePost({ id, userId }) {
    const postId = await BlogPost.findOne({ where: { id } });
    if (!postId) throw new Error('SequelizePostNotFound');

    const findPost = await BlogPost.findOne({ where: { id, user_id: userId } });
    if (!findPost) throw new Error('SequelizePostAcessNotValid');
    return findPost;
  }

  async removePost(postId) {
    const post = await this._removePost(postId);

    await post.destroy();
    return;
  }
}

module.exports = BlogPostRepository;
