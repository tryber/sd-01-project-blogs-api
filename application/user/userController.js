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

router.post('/', (req, res) => {
  const { displayName, email, image } = req.body;

  const user = new User({
    displayName,
    email,
    image,
  });

  new UserRepository()
    .create(user)
    .then((newUser) => {
      res.status(200).json(newUser);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado: ' });
    });
});

router.get('/:id', (req, res, next) => {
  new UserRepository()
    .getById(req.params.id)
    .then((user) => {
      if (user === null) {
        res.status(404).send({ message: 'User não encontrado' });
      }

      res.status(200).json(user);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
});

router.delete('/:id', (req, res) => {
  new UserRepository()
    .remove(req.params.id)
    .then(() => {
      res.status(200).send({ message: 'Usuario excluído com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado: ' });
    });
});

module.exports = router;
