const UserRepository = require('../../infrastructure/user/UserRepository');
const service = require('../../infrastructure/user/serviceUser');
const serviceToken = require('../../service/token');
const { handleError } = require('../../manager/handleError');

exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!service.validateUserData({ email, password })) handleError({ name: 'invalidFields' });
  new UserRepository()
    .getByEmail(email)
    .then((users) => {
      const token = serviceToken.generateToken(users.data());
      res.status(200).json({ token });
    })
    .catch((err) => next(err));
};
