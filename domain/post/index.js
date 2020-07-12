const { attributes } = require('structure');

const Post = attributes({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  idUser: Number,
})(class Post {});

module.exports = Post;
