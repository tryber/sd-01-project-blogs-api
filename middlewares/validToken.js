const serviceToken = require('../service/token');

const validateToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization;
    const payload = serviceToken.getPayload(token);
    if (!payload) return res.status(401).json({ message: 'invalid token user' });
    req.payload = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = validateToken;
