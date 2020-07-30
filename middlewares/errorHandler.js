exports.errorHandler = (err, req, res, next) => {
  res.status(err.statusResponse).json({ message: err.details });
}
