const { isEmailValid, isPasswordValid } = require('../services/fieldsValidation');

function validLoginMiddleware(req, res, next) {
  const { email, password } = req.body;
  if (!isEmailValid(email) || !isPasswordValid(password))
    return res.status(400).json({ message: "Campos Inválidos" });

  next();
}

module.exports = { validLoginMiddleware };
