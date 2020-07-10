const regexEmail = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+\.([a-z]+)?$/i;
const regexPassword = /^[0-9]{6,20}$/;

module.exports = (req, res, next) => {
  const message = 'Campos inválidos';

  const { email, password } = req.body;

  const response =
    regexEmail.test(String(email).toLowerCase()) &&
    regexPassword.test(password);

  if (!email || !password || !response)
    return res.status(400).json({ message });
  return next();
};
