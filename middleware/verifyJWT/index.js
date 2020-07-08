const jwt = require('jsonwebtoken');

const secret = 'pjo33';

module.exports = (email) => {
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};
