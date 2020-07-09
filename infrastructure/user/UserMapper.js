const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id, displayName, email } = dataValues;

    return new User({ id, displayName, email });
  },

  toDatabase(survivor) {
    const { text, isVisible } = survivor;

    return { text, isVisible };
  },
};

module.exports = UserMapper;