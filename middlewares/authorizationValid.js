const { tokenValid } = require('../services/jwt');

exports.authorizationValid = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Usuário não autorizado' });

  const payload = tokenValid(token);

  if (!payload) return res.status(401).json({ message: 'Usuário não autorizado!' });

  req.payload = payload;

  next();
};
