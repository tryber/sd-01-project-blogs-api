const { User, BlogPost } = require('../database/models');
const { Op } = require('sequelize');
const UserModel = require('../user');

class PostModel {
  static async createPost(title, content, email) {
    const { id } = await UserModel.getUserByEmail(email);
    const createdPost = await BlogPost.create({ title, content, user_id: id });
    return createdPost.dataValues;
  }

  static async getAllPosts() {
    const posts = await BlogPost.findAll({
      include: [User]
    });
    return posts.map(({ dataValues }) => dataValues).map(({ id, title, content, published, updated, User }) => (
      { id, title, content, published, updated, user: User.dataValues }
    ));
  }

  static async validateUserAndPost(email, id) {
    const user = await UserModel.getUserByEmail(email);
    const post = await BlogPost.findOne({ where: { id } });
    if (!post || post.dataValues.user_id !== user.id) return false;
    return true;
  }

  static async updatePost(title, content, email, id) {
    const shouldUpdatePost = await PostModel.validateUserAndPost(email, id);
    if (!shouldUpdatePost) return false;
    const updatedPost = await BlogPost.update({ title, content, updated: Date.now() }, { where: { id } });
    return updatedPost[0];
  }

  static async getPost(id) {
    const { dataValues } = await BlogPost.findOne({ where: { id } });
    return dataValues;
  }

  static async deletePost(email, id) {
    const shouldUpdatePost = await PostModel.validateUserAndPost(email, id);
    if (!shouldUpdatePost) return { status: 401, message: 'Unauthorized' };
    await BlogPost.destroy({ where: { id } });
    return { status: 200, message: 'Post deleted' };
  }

  static async getSearch(search) {
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

    if (!posts.length) throw new Error('SequelizeRegexPostNotFound');
    return posts;
  }
}

module.exports = PostModel;
