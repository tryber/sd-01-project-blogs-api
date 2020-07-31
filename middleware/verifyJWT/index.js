const jwt = require('jsonwebtoken');

const UserRepository = require('../../infrastructure/user/UserRepository');

module.exports = async (req, res, next) => {
  const secret = process.env.DB_PASSWORD;
  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const User = new UserRepository();
    const user = await User.getByEmail(payload.email);
    const data = user.getData();
    if (!data) return res.status(401).json({ message: 'Não autorizado' });
    req.user = data;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
