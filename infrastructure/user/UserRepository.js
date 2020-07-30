const UserMapper = require('./UserMapper');
const { User } = require('../database/models');
const { handleError } = require('../../manager/handleError');

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
      handleError(error);
    }
  }

  async isUser(id, idUser) {
    try {
      if (idUser === id) {
        handleError(error, id);
      }
    } catch (err) {
      throw err;
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
      handleError(error);
    }
  }
  async _getByEmail(email) {
    try {
      return await User.findOne({
        where: { email }
      }, { rejectOnEmpty: true });
    } catch (error) {
      handleError(error);
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
