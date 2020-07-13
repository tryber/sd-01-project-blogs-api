const Post = require('../../domain/post');

const PostMapper = {
  toEntity({ dataValues }) {
    const { id, title, content, published, updated, userId, User } = dataValues;
    return new Post({ id, title, content, published, updated, userId, User });
  },

  toDatabase(survivor) {
    const { title, content, userId, updated } = survivor;
    return { title, content, userId, updated };
  },
};

module.exports = PostMapper;
