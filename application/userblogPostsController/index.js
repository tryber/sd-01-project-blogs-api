const express = require('./node_modules/express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const router = express.Router();
const rescue = require('../../middleware/rescue');
const { createToken } = require('../../services');

const callGetAll = async (_req, res) => {
  const User = new UserRepository();
  return User.getAll()
    .then((userResponse) => {
      res.status(200).json(userResponse);
    })
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callGetOne = async (req, res, next) => {
  const { id: userId } = req.params;
  const User = new UserRepository();
  return User.getOne(userId)
    .then((userResponse) => {
      res.status(200).json(userResponse);
    })
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callUserPost = async (req, res, next) => {
  const { displayName, email, image, password = '123456' } = req.body;
  const obj = { displayName, email, image, password };
  const User = new UserRepository();
  return User.updateUser(obj)
    .then((userResponse) => {
      const token = createToken(userResponse.email);
      return res.status(200).json({
        token,
      });
    })
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

const callUserDelete = async (req, res, next) => {
  const User = new UserRepository();
  return User.getAll()
    .then((userResponse) => {
      res.status(200).json(userResponse);
    })
    .catch((error) => {
      console.error('Erro inesperado!', error);
      res.status(400).json({ message: error });
    });
};

router.get('/', rescue(callGetAll));
router.get('/:id', rescue(callGetOne));
router.post('/', rescue(callUserPost));
router.delete('/:id', rescue(callUserDelete));

module.exports = router;
