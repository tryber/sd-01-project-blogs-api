const express = require('express');
const rescue = require('../../rescue');
const validateJWT = require('../../middlewares/validateJWT');
const generateJWT = require('../../infrastructure/service/generateJWT');
const UserModel = require('../../infrastructure/user');
const router = express.Router();

const getUsers = async (_req, res) => {
  const allUsers = await UserModel.getAllUsers();
  return res.status(200).json(allUsers);
};

const createUser = async (req, res) => {
  const { displayName, email } = req.body;
  const userCreated = await UserModel.createUser(displayName, email);
  if (!userCreated) return res.status(400).json({ message: 'User already exists' });
  const token = generateJWT(email);
  return res.status(201).json({ token });
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await UserModel.getUserById(id);
  if (!user) return res.status(400).json({ message: "Invalid user" });
  return res.status(200).json(user);
}

const deleteUser = async (req, res) => {
  const { email } = req.user;
  const { id } = req.params;
  const userDeleted = await UserModel.deleteUser(email, id);
  if (!userDeleted) return res.status(401).json({ message: "Unauthorized" });
  return res.status(200).json({ message: "User deleted"});
};

router.get('/:id', rescue(getUser));
router.post('/', rescue(createUser));

router.use(validateJWT);
router.get('/', rescue(getUsers));
router.delete('/:id', rescue(deleteUser));


module.exports = router;
