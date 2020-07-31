const express = require('express');

const UserRepository = require('../../infrastructure/user/UserRepository');
const rescue = require('../../middleware/rescue');
const verifyUser = require('../../middleware/verifyUser');
const { createToken } = require('../../services');

const router = express.Router();

const callGetAll = async (req, res, next) => {
  const User = new UserRepository();
  return User.getAll()
    .then(userResponse => res.status(200).json(userResponse))
    .catch((error) => {
      console.log('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callPostLogin = async (req, res, next) => {
  const { email } = req.body;
  const User = new UserRepository();
  return User.getByEmail(email)
    .then((userResponse) => {
      const token = createToken(userResponse.email);
      return res.status(200).json({
        token,
      });
    })
    .catch((error) => {
      console.log('Erro inesperado!', error);
      res.status(401).json({ message: error });
    });
};

router.get('/', rescue(callGetAll));
router.post('/', verifyUser, rescue(callPostLogin));

module.exports = router;
