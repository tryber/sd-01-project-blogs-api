const express = require('express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');

exports.getAllUser = (_req, res) => {
  const users = new UserRepository;
  return users.getAllUser()
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
};

exports.createUser = (req, res) => {
  const { displayName, email, image } = req.body;

  const newUser = new User({
    displayName,
    email,
    image,
  })

  const users = new UserRepository;
  return users.createUser(newUser)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
};

exports.login = (req, res) => {
  const { email } = req.body;

  const users = new UserRepository;
  return users.login(email)
    .then(() => {
      res.status(200).json({ message: "Logado!" });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
}
