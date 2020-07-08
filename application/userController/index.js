const express = require('express');
const { User } = require('../models');
const router = express.Router();
const rescue = require('../../middleware/rescue')

const login = (req, res, next) => {
 User.findAll()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(e => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
}

router.post('/', rescue(login));

module.exports = router;
