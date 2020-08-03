const { getAllUser, createUser, login } = require('../application/user/userController');
const { UserById, deleteUser } = require('../application/user/userController');

module.exports = {
  getAllUser,
  createUser,
  login,
  UserById,
  deleteUser,
};
