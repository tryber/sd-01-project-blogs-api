const { isEmailValid, isPasswordValid } = require('../services/dataUserValid');
const { rescueUser } = require('./customErrorTratament');

exports.loginValid = rescueUser((req, res, next) => {
  const { email, password } = req.body;

  if (!isEmailValid(email) || !isPasswordValid(password))
    return res.status(400).json({ message: 'Campos inválidos' });

  next();
});
