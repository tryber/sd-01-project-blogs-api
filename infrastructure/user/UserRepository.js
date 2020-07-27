const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const users = await User.findAll();

    return users.map(UserMapper.toEntity);
  }
}

module.exports = UserRepository;
