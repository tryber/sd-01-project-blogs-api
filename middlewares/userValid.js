const tokenValid = require('../services/verifyJWT');
const { isEmailValid, isPasswordValid, isNameValid, } = require('../services/dataUserValid');
const { errorReadingJWT, rescue } = require('./customErrorTratament');

exports.createUserValid = rescue((req, res, next) => {
  const { displayName, email, password } = req.body;

  if (!isNameValid(displayName))
    return res.status(400).json({ message: 'O nome deve conter de 3 a 40 caracteres alfanuméricos!' });

  if (!isEmailValid(email))
    return res.status(400).json({ message: 'Email com formato inválido' });

  if (!isPasswordValid(password))
    return res.status(400).json({ message: 'A senha deve conter 6 caracteres numericos' });

  next();
});

exports.deleteUserValid = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { id: idUser } = tokenValid(token);

  if (idUser !== Number(id)) return res.status(401).json({ message: 'Usuário não autorizado!' });

  next();
});
