const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');

exports.getAllUsers = (req, res, next) => {
  new UserRepository()
    .getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
};
