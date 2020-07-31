const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id, displayName, email, image, password } = dataValues;
    return new User({ id, displayName, email, image, password });
  },

  toDatabase(survivor) {
    const { displayName, email, image, password } = survivor;
    return { displayName, email, image, password };
  },
};

module.exports = UserMapper;
