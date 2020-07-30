const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAllUser() {
    const users = await User.findAll();

    return users.map(UserMapper.toEntity);
  }

  async createUser(user) {
    const newUser = await User.create(UserMapper.toDatabase(user));

    return UserMapper.toEntity(newUser);
  }

  async login(login) {
    const { email } = login;
    const newLogin = await User.findOne({ where: { email } });

    return newLogin;
  }
}

module.exports = UserRepository;
