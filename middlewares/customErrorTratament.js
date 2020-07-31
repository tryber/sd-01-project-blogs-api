exports.errorReadingJWT = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    console.log(err.message)
    res.status(401).json({ error: 'Token não é válido!' });
  }
};

exports.rescueUser = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    switch (err.message || err.name) {
      case 'SequelizeUniqueConstraintError':
        return res.status(400).json({ message: 'Usuário já existe' });

      case 'SequelizeEmptyResultError':
        return res.status(404).json({ message: 'Usuário não encontrado' });

      default:
        return res.status(500).json({ error: err.name, message: err.message });
    }
  }
};

exports.rescueBlogPost = fn => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (err) {
    switch (err.message) {
      case 'SequelizeEmailNotFound':
        return res.status(400).json({ message: 'Campos inválidos' });

      case 'SequelizePostNotFound':
        return res.status(404).json({ message: 'Post não encontrado' });

      case 'SequelizeRegexPostNotFound':
        return res.status(404).json({
          message: 'Nenhum título ou conteúdo inclui os parâmetros passados',
        });

      case 'SequelizePostAcessNotValid':
        return res.status(401).json({
          message: 'Usúario não altorizado a fazer alterações neste post',
        });

      default:
        return res.status(500).json({ error: err.name, message: err.message });
    }
  }
};
