const BlogPost = require('../../domain/blogPost');

const BlogPostMapper = {
  toEntity({ dataValues }) {
    const { id, title, content, published, updated, user_id: userId, User } = dataValues;

    return new BlogPost({ id, title, content, published, updated, userId, User });
  },

  toDatabase(survivor) {
    const { title, content, user_id } = survivor;

    return { title, content, updated: new Date(), user_id };
  },
};

module.exports = BlogPostMapper;
