const BlogPost = require('../../domain/blog');

const BlogPostMapper = {
  toEntity({ dataValues }) {
    const { title, content, user_id: id } = dataValues;
    return new BlogPost({ title, content, id });
  },

  toDatabase(survivor) {
    const {id, title, content,  id: user_id } = survivor;
    console.log(`******${title}, ${content}, ${user_id}****`)
    return { id, title, content, user_id };
  },
};

module.exports = BlogPostMapper;