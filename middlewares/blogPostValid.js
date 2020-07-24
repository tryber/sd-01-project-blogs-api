const { isTitleValid, isContentValid } = require('../services/dataBlogPostValid');

exports.createPostValid = rescue((req, res, next) => {
  const { title, content } = req.body;

  if (!isTitleValid(title))
    return res.status(400).json({ message: 'O título deve conter de 1 a 100 caracteres' });

  if (!isContentValid(content))
    return res.status(400).json({ message: 'O conteúdo deve conter de 1 a 255 caracteres' });

  next();
});
