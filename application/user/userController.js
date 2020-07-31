const express = require('express');

const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');
const { createUserValid, deleteUserValid } = require('../../middlewares/userValid');
const { authorizationValid } = require('../../middlewares/authorizationValid');
const createJWT = require('../../services/createJWT');
const { rescueUser } = require('../../middlewares/customErrorTratament');

const router = express.Router();

const listUser = async (_req, res, _next) => {
  const listUser = await new UserRepository().getAll();
  res.status(200).json(listUser);
};

const createUser = async (req, res) => {
  const { displayName, email, image = 'URL' } = req.body;

  const user = new User({ displayName, email, image });

  const newUser = await new UserRepository().create(user);

  const token = createJWT(newUser);
  res.status(201).json({ token });
};

const detailUser = async (req, res, _next) => {
  const detailUser = await new UserRepository().getById(req.params.id);
  res.status(200);
  res.json(detailUser);
};

const deleteUser = async (req, res) => {
  await new UserRepository().remove(req.payload);
  res.status(200).json({ message: 'Usuário excluído com sucesso!'});
};

router.post('/', createUserValid, rescueUser(createUser));

router.use(authorizationValid);

router.get('/', rescueUser(listUser));
router.get('/:id', rescueUser(detailUser));
router.delete('/:id', deleteUserValid, rescueUser(deleteUser));

module.exports = {
  userRouter: router,
  createUser,
  listUser,
  detailUser,
  deleteUser,
};
