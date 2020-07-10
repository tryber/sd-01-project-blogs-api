const tokenValid = require('../services/verifyJWT');
const { isEmailValid, isPasswordValid, isNameValid, } = require('../services/dataUserValid');
const { errorReadingJWT } = require('./rescue');

const authorizationValid = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;

  if (!token) return res.status(401).json({ message: 'Usuário não autorizado!' });

  const payload = tokenValid(token);

  if (!payload) return res.status(401).json({ message: 'Usuário não autorizado!' });

  next();
});

const createUserValid = errorReadingJWT((req, res, next) => {
  const { displayName, email, password } = req.body;

  if (!isEmailValid(email))
    return res.status(400).json({ message: 'Email com formato inválido' });

  if (!isPasswordValid(password))
    return res.status(400).json({ message: 'A senha deve conter 6 caracteres numericos' });

  if (!isNameValid(displayName))
    return res.status(400).json({ message: 'O nome deve conter de 3 a 40 caracteres alfanuméricos!' });

  next();
});

const deleteUserValid = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { id: idUser } = tokenValid(token);

  if (idUser !== Number(id)) return res.status(401).json({ message: 'Usuário não autorizado!' });

  next();
});

module.exports = { authorizationValid, createUserValid, deleteUserValid };
