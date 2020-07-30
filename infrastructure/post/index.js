const { User, BlogPost } = require('../database/models');
const UserModel = require('../user');

class PostModel {
  static async createPost(title, content, email) {
    const { id } = await UserModel.getUserByEmail(email);
    const createdPost = await BlogPost.create({ title, content, user_id: id });
    return createdPost.dataValues;
  }

  static formateObj(postArray) {
    const blogs = postArray.map(({ dataValues }) => dataValues);
    const newObj = blogs.map(({ id, title, content, published, updated, User }) => (
      { id, title, content, published, updated, user: User.dataValues }
    ));
    return newObj;
  }

  static async getAllPosts() {
    const posts = await BlogPost.findAll({
      include: [User]
    });
    return PostModel.formateObj(posts);
  }
}

module.exports = PostModel;
