const tokenValid = require('../services/verifyJWT');
const { errorReadingJWT } = require('./customErrorTratament');

exports.authorizationValid = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Usuário não autorizado!' });

  const payload = tokenValid(token);

  if (!payload) return res.status(401).json({ message: 'Usuário não autorizado!' });

  next();
});

// req.payload = payload;
