const { isEmailValid, isPasswordValid, } = require('../services/dataUserValid');
const { rescue } = require('./customErrorTratament');

exports.loginValid = rescue((req, res, next) => {
  const { email, password } = req.body;

  if (!isEmailValid(email) || !isPasswordValid(password))
    return res.status(400).json({ message: 'Campos inválidos' });

  next();
});
