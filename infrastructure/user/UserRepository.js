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

  async _getById(id) {
    const user = await User.findByPk(id);
    if (!user) throw new Error('UserNotFound');
    return user;
  }

  async getById(id) {
    const user = await this._getById(id);

    return UserMapper.toEntity(user);
  }

  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
  }

  async _loginValidEmail(email) {
    const findEmail = await User.findOne({ where: { email } });
    if (!findEmail) throw new Error('SequelizeEmailNotFound');
    return findEmail;
  }

  async login({ email }) {
    const newLogin = await this._loginValidEmail(email);

    return UserMapper.toEntity(newLogin);
  }
}

module.exports = UserRepository;
