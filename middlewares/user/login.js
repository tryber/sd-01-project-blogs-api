const isEmailValid = (email = '') => {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
}

const isPasswordValid = (password = '') => {
  regex = /(^[0-9]{6,63})+$/;
  return password.match(regex);
}

function validLoginMiddleware(req, res, next) {
  const { email, password } = req.body;

  if (!isEmailValid(email), !isPasswordValid(password))
    return res.status(400).json({ message: "Campos Inválidos" });

  next();
}

module.exports = { validLoginMiddleware };
