const UserMapper = require('./UserMapper');

const { Users } = require('../database/models');

class UserRepository {
  async getAll() {
    const users = await Users.findAll();
    return users.map(UserMapper.toEntity);
  }

  async _getByEmail(email) {
    try {
      return await Users.findOne({
        where: {
          email,
        },
      });
    } catch (error) {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Users com identificador ${email} não foi encontrado.`;

        throw notFoundError;
      }

      throw error;
    }
  }

  async getByEmail(email) {
    const Users = await this._getByEmail(email);
    return UserMapper.toEntity(Users);
  }
  
}

module.exports = UserRepository;
