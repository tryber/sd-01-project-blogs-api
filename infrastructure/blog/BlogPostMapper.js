const Post = require('../../domain/post');

const PostMapper = {
  toEntity({ dataValues }) {
    const { title, content, idUser } = dataValues;
    return new Post({ title, content, idUser });
  },

  toDatabase(survivor) {
    const { title, content, idUser } = survivor;

    return { title, content, idUser };
  },
};

module.exports = PostMapper;