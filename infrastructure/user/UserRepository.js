const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    console.log(User);
    const users = await User.findAll();

    return users.map(UserMapper.toEntity);
  }

  async create(users) {
    const { valid, errors } = users.validate();

    if (!valid) {
      const error = new Error('ValidationError');
      error.details = errors;

      throw error;
    }

    const newUser = await User.create(UserMapper.toDatabase(users));
    return UserMapper.toEntity(newUser);
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
    const tweet = await this._getById(id);

    await tweet.destroy();
    return;
  }
}

module.exports = UserRepository;
