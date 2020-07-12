module.exports = (req, res, next) => {
    const message = 'Campos inválidos';
    const { title, content } = req.body;
    const response = !title || !content
    if (response)
      return res.status(500).json({ message });
    return next();
  };
  