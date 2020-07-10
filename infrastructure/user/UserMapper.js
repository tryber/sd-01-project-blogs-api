const User = require('../../domain/user');
const { encrypt } = require('../../services/crypto');

const UserMapper = {
  toEntity({ dataValues }) {
    const { id, displayName, email, image } = dataValues;

    return new User({ id, displayName, email, image });
  },

  toDatabase(survivor) {
    const { displayName, email, image, password } = survivor;

    return { displayName, email, image, password: encrypt(password) };
  },
};

module.exports = UserMapper;
