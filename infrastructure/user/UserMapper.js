const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id, text, isVisible, createdAt } = dataValues;

    return new User({ id, text, isVisible, createdAt });
  },

  toDatabase(survivor) {
    const { text, isVisible } = survivor;

    return { text, isVisible };
  },
};

module.exports = UserMapper;
