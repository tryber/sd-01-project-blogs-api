const { attributes } = require('structure');

const BlogPost = attributes({
  id: Number,
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  published: Date,
  updated: Date,
  user_id: {
    type: Number,
    required: true,
  },
})(
  class BlogPost {
    dataUser() {
      return this;
    }
  }
);

module.exports = BlogPost;
