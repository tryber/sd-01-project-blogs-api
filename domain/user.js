const { attributes } = require('structure');

const User = attributes({
  id: Number,
  title: {
    type: String,
    required: true,
    maxLength: 150,
  },
  displayName: {
    type: String,
    required: true,
    maxLength: 255,
  },
  email: {
    type: String,
    required: true,
    maxLength: 255,
  },
  image: {
    type: String,
    required: true,
    maxLength: 255,
  },
})(
  class User {

  }
);

module.exports = User;
