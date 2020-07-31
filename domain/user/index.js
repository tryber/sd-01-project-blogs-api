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
})(
  class User {
    getData() {
      const { id, displayName, email, image } = this;
      return { id, displayName, email, image };
    }
  },
);

module.exports = User;
