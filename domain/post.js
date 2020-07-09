const { attributes } = require('structure');

const Post = attributes({
  id: Number,
  title: {
    type: String,
    required: true,
    maxLength: 150,
  },
  content:{
    type: String,
    required: true,
    maxLength: 255,
  },
  userId:Number,
  published: Date,
  updated: Date,
})(
  class Post {
    
  }
);

module.exports = Post;
