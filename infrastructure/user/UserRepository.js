const UserMapper = require('./UserMapper');
const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const users = await User.findAll();

    return users.map(UserMapper.toEntity);
  }

  async _getByEmail(email) {
    const findEmail = await User.findOne({ where: { email } })
    if (findEmail) throw new Error('SequelizeEmailFindError');
  }

  async create(users, { email }) {
    const { valid, errors } = users.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }
    await this._getByEmail(email);

    const { dataValues } = await User.create(UserMapper.toDatabase(users));
    return dataValues;
  }

  async _getById(id) {
    try {
      return await User.findByPk(id, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') throw new Error('Usuário não encontrado');
      throw error;
    }
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
    const findEmail = await User.findOne({ where: { email } })
    if (!findEmail) throw new Error('SequelizeEmailNotFound');
    return findEmail;
  }

  async login({ email }) {
    const user = await this._loginValidEmail(email);

    return UserMapper.toEntity(user);
  }
  
}

module.exports = UserRepository;
