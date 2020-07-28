const UserMapper = require('./UserMapper');
const { User } = require('../database/models');

class UserRepository {
  async getAll() {
    const user = await User.findAll();
    return user.map(UserMapper.toEntity);
  }
  async create(user) {
    try {
      const newUser = await User.create(UserMapper.toDatabase(user));
      return UserMapper.toEntity(newUser);
    } catch (error) {
      if (error.name === 'SequelizeUniqueConstraintError') {
        const duplicateEmailError = new Error('DuplicateEmail');
        duplicateEmailError.details = `Email já está sendo usado.`;

        throw duplicateEmailError;
      }
      if (error.name === 'SequelizeValidationError') {
        const invalidFiledError = new Error('invalidFiledError');
        invalidFiledError.details = `Campo invalido.`;

        throw invalidFiledError;
      }
      throw error;
    }
  }

  async isUser(id, idUser) {
    try {
      if (idUser === id) {
        const unauthorizedError = new Error('unauthorized');
        unauthorizedError.details = 'Não possui autorização';
        throw unauthorizedError;
      }
    } catch (err) {
      throw error;
    }
  }

  async remove(id, idUser) {
    const user = await this._getById(id);
    this.isUser(id, idUser);
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
  async _getByEmail(email) {
    try {
      return await User.findOne({
        where: { email }
      }, { rejectOnEmpty: true });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `User com email ${email} não foi encontrado.`;
        throw notFoundError;
      }
      throw error;
    }
  }
  async getByEmail(email) {
    const user = await this._getByEmail(email);
    return UserMapper.toEntity(user);
  }
  async getById(id) {
    const user = await this._getById(id);
    return UserMapper.toEntity(user);
  }
}

module.exports = UserRepository;
