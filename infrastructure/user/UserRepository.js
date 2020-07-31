const UserMapper = require('./UserMapper');

const { Users } = require('../database/models');

class UserRepository {
  async getAll() {
    const users = await Users.findAll();
    return users.map(UserMapper.toEntity);
  }

  async getOne(id) {
    const users = await Users.findOne({
      where: {
        id,
      },
    }).catch((error) => {
      if (error.name === 'SequelizeEmptyResultError') {
        const notFoundError = new Error('NotFoundError');
        notFoundError.details = `Users com identificador ${id} não foi encontrado.`;
        throw notFoundError;
      }

      throw error;
    });
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

  async updateUser(obj) {
    const { displayName, email, image, password } = obj;
    const users = await this._getByEmail(email);
    if (!users) return { message: 'Usuário já existe' };
    return Users.create({ displayName, email, image, password });
  }

  async getByEmail(email) {
    const Users = await this._getByEmail(email);
    return UserMapper.toEntity(Users);
  }

  async deleteUserById(id) {
    const user = await Users.findByPk(id, { rejectOnEmpty: true });
    await user.destroy();
    return { message: 'Deletado user com sucesso' };
  }
}

module.exports = UserRepository;
