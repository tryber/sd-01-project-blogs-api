const UserRepository = require('../../infrastructure/user/UserRepository');
const serviceToken = require('../../service/token');

exports.getAllUsers = (req, res, next) => {
  new UserRepository()
    .getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => next(err));
};

exports.createUser = (req, res, next) => {
  const { email, displayName, image } = req.body;
  new UserRepository()
    .create({ email, displayName, image })
    .then((users) => {
      const token = serviceToken.generateToken(users.data());
      res.status(200).json({ token });
    })
    .catch((err) => next(err));
};

exports.getOneUserById = (req, res, next) => {
  const { id } = req.params;
  new UserRepository()
    .getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => next(err));
}

exports.deleteUser = (req, res, next) => {
  const { payload, params } = req;
  console.log(payload, params)
  new UserRepository()
    .remove(payload.id, params.id)
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((err) => next(err));
}
