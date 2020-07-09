const User = require('../../domain/user');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id, displayName, email, image } = dataValues;

    return new User({ id, displayName, email, image });
  },

  toDatabase(survivor) {
    const { displayName, email, image } = survivor;

    return { displayName, email, image };
  },
};

module.exports = UserMapper;
