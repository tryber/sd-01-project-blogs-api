const express = require('express');
const generateJWT = require('../../infrastructure/service/generateJWT');
const UserModel = require('../../infrastructure/user');
const router = express.Router();

const regex = /^[\w+.]+@\w+.\w{2,}(?:.\w{2})?$/;

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await UserModel.getUserByEmail(email);
  if (!/^[0-9]{6}$/.test(password) || !regex.test(email) || !user)
    return res.status(400).json({ message: "Campos Inválidos" });
  const token = generateJWT(email);
  return res.status(400).json({ token });
}

router.post('/', login);

module.exports = router;
