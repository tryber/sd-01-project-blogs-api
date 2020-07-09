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
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

module.exports = router;
