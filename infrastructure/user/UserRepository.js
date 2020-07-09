const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
 
  static async getAll() {
    const users = await User.findAll();

    return users.map(UserMapper.toEntity);
  }
}

module.exports = UserRepository;
