const { isTitleValid, isContentValid } = require('../services/dataBlogPostValid');
const { rescue } = require('./customErrorTratament');

exports.setPostValid = rescue((req, res, next) => {
  const { title, content } = req.body;

  if (!isTitleValid(title) || !title)
    return res.status(400).json({ message: 'O título deve conter de 1 a 100 caracteres' });

  if (!isContentValid(content) || !content)
    return res.status(400).json({ message: 'O conteúdo deve conter de 1 a 255 caracteres' });

  next();
});
