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

exports.getOneUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const User = new UserRepository();
    const data = await User.getById(id);
    return res.status(200).json(data);
  } catch (err) {
    next(err)
  }
}

exports.deleteUser = (req, res, next) => {
  const { payload, params } = req;
  new UserRepository()
    .remove(payload.id, params.id)
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((err) => next(err));
}
