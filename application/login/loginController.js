const express = require('express');
const router = express.Router();
const jwt = require('../../infrastructure/service/generateJWT');

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
const passwordRegex = /^[0-9]{6}$/;

router.post('/', (req, res) => {
  const { email, password } = req.body;
  if (emailRegex.test(email) && passwordRegex.test(password))
    return res.json({ token: jwt(email) });
  return res.status(400).json({ message: "Campos inválidos!" });
});

module.exports = router;
