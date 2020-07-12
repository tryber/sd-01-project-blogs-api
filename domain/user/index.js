const { attributes } = require('structure');

const User = attributes({
  id: Number,
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
})(class User {});

module.exports = User;
