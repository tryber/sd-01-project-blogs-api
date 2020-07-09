const Post = require('../../domain/user');

const PostMapper = {
  toEntity({ dataValues }) {
    const { id, title, content, userId, published, updated } = dataValues;

    return new Post({ id, title, content, userId, published, updated });
  },

  toDatabase(survivor) {
    const { title, content, userId, updated } = survivor;

    return { title, content, userId, updated };
  },
};

module.exports = PostMapper;
