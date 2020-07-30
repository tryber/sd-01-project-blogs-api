const BlogPost = require('../../domain/blog');

const BlogPostMapper = {
  toEntity({ dataValues }) {
    const { title, content, userId } = dataValues;
    return new BlogPost({ title, content, userId });
  },

  toDatabase(survivor) {
    const {id, title, content,  userId } = survivor;
    return { id, title, content, userId };
  },
};

module.exports = BlogPostMapper;