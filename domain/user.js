const { attributes } = require('structure');

const User = attributes({
  id: Number,
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
    isValidUser() {
      return this.email
    }
  }
);

module.exports = User;
