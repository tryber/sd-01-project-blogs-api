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
})(class BlogPost {
  getData(){
    const { title, content, user_id, updatedAt, createdAt } = this
    return { title, content, user_id, updatedAt, createdAt }
  }
});

module.exports = BlogPost;
