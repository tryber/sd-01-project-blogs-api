const express = require('express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const router = express.Router();

router.get('/', (_req, res) => {
  const users = new UserRepository;
  return users.getAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

module.exports = router;
