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

exports.emailAlreadyExist = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.name === 'SequelizeUniqueConstraintError')
      return res.status(404).json({ message: 'Usuário já existe' });

    return res.status(500).json({ error: err.name });
  }
};

exports.emailInvalid = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizeEmailNotFound')
      return res.status(400).json({ message: 'Campos inválidos' });

    console.log(err.message);
    return res.status(500).json({ error: err.name });
  }
};

exports.invalidQueryString = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizePostNotFound')
      return res.status(400).json({ 
        message: 'Nenhum título ou conteúdo inclui os parâmetros passados' 
      });

    return res.status(500).json({ error: err.name });
  }
};

exports.postNotFound = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizePostNotFound')
      return res.status(404).json({ message: 'Post não encontrado' });

    return res.status(500).json({ error: err.name });
  }
};

exports.accessDeniedPost = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message);
    if (err.message === 'SequelizePostAcessNotValid')
      return res.status(404).json({
        message: 'Usúario não altorizado a fazer alterações neste post',
      });

    return res.status(500).json({ error: err.name });
  }
};
