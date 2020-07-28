const UserRepository = require('../../infrastructure/user/UserRepository');
const serviceToken = require('../../service/token');

exports.getAllUsers = (req, res, next) => {
  new UserRepository()
    .getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: e.details, trace: e.trace });
    });
};

exports.createUser = (req, res, next) => {
  const { email, displayName, image } = req.body;
  new UserRepository()
    .create({ email, displayName, image })
    .then((users) => {
      s
      const token = serviceToken.generateToken(users.data());
      res.status(200).json({ token });
    })
    .catch((e) => {
      console.log(e);
      console.log(e.name);
      res.status(500).json({ message: e.details, trace: e.trace });
    });
};

exports.getOneUserById = (req, res, next) => {
  const { id } = req.params;
  new UserRepository()
    .getById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(401).json({ message: e.details, trace: e.trace });
    });
}

exports.deleteUser = (req, res, next) => {
  const { payload, params } = req;
  console.log(payload, params)
  new UserRepository()
    .remove(payload.id, params.id)
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(401).json({ message: e.details, trace: e.trace });
    })
}
