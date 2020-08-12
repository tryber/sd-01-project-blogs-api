const jwt = require('jsonwebtoken');
const User = require('../infrastructure/user');

async function verifyJWT(req, res, next) {
  const secret = 'trybe';
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const { email } = payload;
    const verifyUser = await User.userExists(email);
    if (!verifyUser)
      return res.status(401).json({ message: 'Token inválido!' });
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = verifyJWT;
