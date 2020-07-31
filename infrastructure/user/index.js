const { User } = require('../database/models');

class UserModel {
  static async userExists(email) {
    const hasUser = await User.findOne({ where: { email } });
    return hasUser;
  }

  static async createUser(displayName, email) {
    const hasUser = await UserModel.userExists(email);
    if (hasUser) return false;
    const { dataValues } = await User.create({ displayName, email, image: 'URL' });
    return dataValues;
  }

  static async getAllUsers() {
    const users = await User.findAll();
    return users.map(user => user.dataValues);
  }

  static async getUserById(id) {
    const user = await User.findOne({ where: { id }});
    if(!user) return false;
    return user.dataValues;
  }

  static async getUserByEmail(email) {
    const user = await User.findOne({ where: { email }});
    if(!user) return false;
    return user.dataValues;
  }

  static async deleteUser(email, id) {
    const user = await User.findOne({ where: { id }});
    if(!user || user.dataValues.email !== email) return false;
    const deletedUser = await user.destroy({ where: { id }});
    return deletedUser;
  }
};

module.exports = UserModel;
