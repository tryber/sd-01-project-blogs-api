const express = require('express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');
const router = express.Router();

router.get('/', (req, res, next) => {
  new UserRepository()
    .getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      res.status(200).json({ message: e.trace });
    })
})

module.exports = router;
