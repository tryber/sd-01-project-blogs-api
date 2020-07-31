const jwt = require('jsonwebtoken');

const secret = 'SenhaSecreta';

exports.generateToken = (payload) => {
  const jwtConfig = {
    expiresIn: '3d',
    algorithm: 'HS256',
  };
  const token = jwt.sign(payload, secret, jwtConfig);
  return token;
}

exports.getPayload = (token) => {
  return jwt.verify(token, secret);
}
