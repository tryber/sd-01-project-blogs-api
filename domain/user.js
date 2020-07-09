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
  createdAt: Date,
  updatedAt: Date,
})(
  class User {
    dataUser() {
      return this;
    }
  }
);

module.exports = User;
