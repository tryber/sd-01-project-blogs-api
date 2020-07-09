const express = require('express');
const User = require('../../infrastructure/user/UserRepository');
const router = express.Router();
// const rescue = require('../../middleware/rescue')

const getAll = async (req, res, next) => {
  await User.findAll()
    .then(userResponse => {
      res.status(200).json(userResponse);
    })
    .catch(error => {
      res.status(400).send(error);
    });
};

router.get('/', getAll);

module.exports = router;
