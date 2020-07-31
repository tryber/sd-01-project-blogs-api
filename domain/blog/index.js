const { attributes } = require('structure');

const BlogPost = attributes({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  user_id: Number,
  updatedAt: Date,
  createdAt: Date,
})(class BlogPost {});

module.exports = BlogPost;
