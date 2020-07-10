const express = require('express');

const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');
const { authorizationValid, createUserValid, deleteUserValid } = require('../../middlewares/userValid');
const createJWT = require('../../services/createJWT');
const { emailAlreadyExist } = require('../../middlewares/rescue')

const router = express.Router();

const listUser = (_req, res, _next) => {
  new UserRepository()
    .getAll()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
    });
};

const createUser = async (req, res) => {
  const { displayName, email, image, password } = req.body;

  const user = new User({
    displayName,
    email,
    image,
    password,
  });

  const newUser = await new UserRepository().create(user, req.body);
  const token = createJWT(newUser);
  res.status(201).json({ token });
};

const detailUser = (req, res, _next) => {
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
};

const deleteUser = (req, res) => {
  new UserRepository()
    .remove(req.params.id)
    .then(() => {
      res.status(204).send({ message: 'Usuario excluído com sucesso.' });
    })
    .catch((e) => {
      console.log(e.message);
      res.status(500).send({ message: 'Algo deu errado: ' });
    });
};

router.post('/', createUserValid, emailAlreadyExist(createUser));

router.use(authorizationValid);

router.get('/', listUser);
router.get('/:id', detailUser);
router.delete('/:id', deleteUserValid, deleteUser);

module.exports = router;
