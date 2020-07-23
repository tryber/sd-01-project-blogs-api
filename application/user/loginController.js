const express = require('express');

const UserRepository = require('../../infrastructure/user/UserRepository');
const createJWT = require('../../services/createJWT');
const { emailInvalid } = require('../../middlewares/customErrorTratament');
const { loginValid } = require('../../middlewares/loginValid');

const router = express.Router();

const login = async (req, res) => {
  const newUser = await new UserRepository().login(req.body);

  const token = createJWT(newUser);
  res.status(201).json({ token });
};

router.post('/', loginValid, emailInvalid(login));

module.exports = { loginRouter: router };
