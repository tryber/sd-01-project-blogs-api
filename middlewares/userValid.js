const { tokenValid } = require('../services/jwt');

exports.createUserValid = (req, res, next) => {
  const { displayName, email, password, image } = req.body;

  if (!displayName || !email || !password || !image)
    res.status(401).json({ message: "Está faltando campos!" });

  next();
}

exports.deleteUserValid = (req, res, next) => {
  const token = req.headers.authorization;
  const { id } = req.params;

  const { id: idUser } = tokenValid(token);

  if (idUser !== Number(id))
    return res.status(401).json({ message: 'Usuário não autorizado ou não encontrado!' });

  next();
}
