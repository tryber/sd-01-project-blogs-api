const express = require('express');
const Users = require('../../infrastructure/database/models/Users');
const router = express.Router();

console.log(Users);

router.get('/', (_req, res) => {
  Users.findAll()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

module.exports = router;
