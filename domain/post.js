const { attributes } = require('structure');

const Post = attributes({
  id: Number,
  title: {
    type: String,
    required: true,
    maxLength: 150,
  },
  content: {
    type: String,
    required: true,
    maxLength: 255,
  },
  userId: Number,
  published: Date,
  updated: Date,
  User: Object,
})(
  class Post {
    data() {
      const { id, title, content, userId, published, updated, User } = this;
      return { id, title, content, userId, published, updated, User };
    }
  }
);

module.exports = Post;
