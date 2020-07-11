const BlogPost = require('../../domain/blogPost');

const BlogPostMapper = {
  toEntity({ dataValues }) {
    const { id, title, content, published, updated, user_id: userId } = dataValues;

    return new BlogPost({ id, title, content, published, updated, userId });
  },

  toDatabase(survivor) {
    const { title, content, user_id } = survivor;

    return { title, content, updated: new Date(), user_id };
  },
};

module.exports = BlogPostMapper;
