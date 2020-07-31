const tokenValid = require('../services/verifyJWT');
const { isEmailValid, isNameValid, } = require('../services/dataUserValid');
const { errorReadingJWT, rescueUser } = require('./customErrorTratament');

exports.createUserValid = rescueUser((req, res, next) => {
  const { displayName, email } = req.body;

  if (!isNameValid(displayName))
    return res.status(400).json({ message: 'O nome deve conter de 3 a 40 caracteres alfanuméricos!' });

  if (!isEmailValid(email))
    return res.status(400).json({ message: 'Email com formato inválido' });

  next();
});

exports.deleteUserValid = errorReadingJWT((req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { id: idUser } = tokenValid(token);

  if (idUser !== Number(id))
    return res.status(401).json({ message: 'Usuário não autorizado ou não encontrado!' });

  next();
});
