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
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User com identificador ${id} não foi encontrado.`;

        throw notFoundError;
      }

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
}

module.exports = UserRepository;
