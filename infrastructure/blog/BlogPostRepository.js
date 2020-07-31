const { Op } = require('sequelize');

const BlogPostMapper = require('./BlogPostMapper');

const { BlogPosts, Users } = require('../database/models');

BlogPosts.belongsTo(Users, { foreignKey: 'id' });
Users.hasMany(BlogPosts, { foreignKey: 'id' });

class BlogPostRepository {
  static async getAll() {
    const posts = await BlogPosts.findAll({
      include: [Users],
    });
    return posts.map(({ dataValues }) => dataValues);
  }

  static async _getByPK(id) {
    const user = await BlogPosts.findByPk(id);
    return user;
  }

  static async _getById(id) {
    return BlogPosts.findByPk(
      id,
      { include: [Users] },
      { rejectOnEmpty: true }
    );
  }

  static async getById(id) {
    const post = await BlogPostRepository._getById(id);
    return post.dataValues;
  }

  static async updateBlog(obj) {
    const { title, content, userId } = obj;
    await BlogPosts.update(
      { title, content },
      {
        where: {
          userId,
        },
      },
    );
    return { message: 'Blog atualizado com sucesso' };
  }

  static async getByQuery(q) {
    const posts = await BlogPosts.findAll(
      { include: [Users] },
      {
        where: {
          [Op.or]: [
            {
              title: {
                [Op.like]: `%${q}%`,
              },
            },
            {
              content: {
                [Op.like]: `%${q}%`,
              },
            },
          ],
        },
      },
    );
    return posts;
  }

  static async deletPostById(idUser) {
    const post = await BlogPostRepository._getById(idUser);
    await post.destroy();
    return { message: 'Deletado post com sucesso' };
  }

  static async createPost(post) {
    const posts = await BlogPosts.create(BlogPostMapper.toDatabase(post));
    return BlogPostMapper.toEntity(posts);
  }
}

module.exports = BlogPostRepository;
