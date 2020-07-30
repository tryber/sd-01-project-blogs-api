const UserRepository = require('../../infrastructure/user/UserRepository');
const service = require('../../infrastructure/user/serviceUser');
const serviceToken = require('../../service/token');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!service.validateUserData({ email, password })) return res.status(500).json({ message: 'Campos invalidos' });
  new UserRepository()
    .getByEmail(email)
    .then((users) => {
      const token = serviceToken.generateToken(users.data());
      res.status(200).json({ token });
    })
    .catch((e) => {
      res.status(500).json({ message: e.message });
    });
};
