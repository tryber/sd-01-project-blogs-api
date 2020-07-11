const express = require('express');

const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');
const { authorizationValid, createUserValid, deleteUserValid } = require('../../middlewares/userValid');
const createJWT = require('../../services/createJWT');
const { emailInvalid, rescue } = require('../../middlewares/rescue')

const router = express.Router();

const listUser = async (_req, res, _next) => {
  const listUser = await new UserRepository().getAll();
  res.status(200).json(listUser);
};

const createUser = async (req, res) => {
  const { displayName, email, image, password } = req.body;

  const user = new User({ displayName, email, image, password });

  const newUser = await new UserRepository().create(user, req.body);

  const token = createJWT(newUser);
  res.status(201).json({ token });
};

const detailUser = async (req, res, _next) => {
  const detailUser = await new UserRepository().getById(req.params.id);
  res.status(200).json(detailUser);
};

const deleteUser = async (req, res) => {
  await new UserRepository().remove(req.params.id)
  res.status(204);
};

router.post('/', createUserValid, emailInvalid(createUser));

router.use(authorizationValid);

router.get('/', rescue(listUser));
router.get('/:id', rescue(detailUser));
router.delete('/:id', deleteUserValid, rescue(deleteUser));

module.exports = { userRouter: router };
