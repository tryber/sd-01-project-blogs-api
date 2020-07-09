const UserMapper = require('./UserMapper');

const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const user = await User.findAll({
      where: {
        isVisible: true,
      },
    });

    return user.map(UserMapper.toEntity);
  }
  async create(user) {
    const newUser = await User.create(UserMapper.toDatabase(user));
    return UserMapper.toEntity(newUser);
  }
  async remove(id) {
    const user = await this._getById(id);

    await user.destroy();
    return;
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
}

module.exports = UserRepository; 
