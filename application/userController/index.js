const express = require('express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const router = express.Router();
const rescue = require('../../middleware/rescue');
const verifyUser = require('../../middleware/verifyUser')

const callGetAll = async (req, res, next) => {
  const User = new UserRepository();
  return User.getAll()
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      console.log('deu errado', error);
      res.status(400).json({ message: error });
    });
};

const callPostLogin = async (req, res, next) => {
  const { email } = req.body
  const User = new UserRepository();
  return User.getByEmail(email).then(userResponse => {
    res.status(200).json(userResponse);
  })
  .catch(error => {
    console.log('deu errado', error);
    res.status(401).json({ message: error });
  });
}

router.get('/', rescue(callGetAll));
router.get('/', verifyUser, rescue(callPostLogin));

module.exports = router;
