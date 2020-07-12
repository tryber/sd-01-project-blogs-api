const User = require('../../infrastructure/user/UserRepository')
const jwt = require('jsonwebtoken');

module.exports =  validateToken = async(req, res, next) => {
  
  const secret = process.env.DB_PASSWORD;

  try {
    const token = req.headers.authorization;
    const payload = jwt.verify(token, secret);
    const users = new User()
    const user = await users.getByEmail(payload.data.email);
    if (!user )
      return res.status(401).json({ message: 'Não autorizado' });
    req.user = payload;
    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}
