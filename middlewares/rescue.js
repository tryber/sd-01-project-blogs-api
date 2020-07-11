exports.rescue = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message)
    res.status(500).json({ error: err.message });
  }
};

exports.errorReadingJWT = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message)
    res.status(401).json({ error: 'Token não é válido!' });
  }
};

exports.emailInvalid = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizeEmailFindError')
      return res.status(400).json({ message: 'Usuário já existe' });

    if (err.message === 'SequelizeEmailNotFound')
      return res.status(400).json({ message: 'Campos inválidos' });

    console.log(err.message);
    return res.status(500).json({ error: err.name });
  }
};
