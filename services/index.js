const jwt = require('jsonwebtoken');

const createToken = (email) => {
  const secret = process.env.DB_PASSWORD;
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };
  const token = jwt.sign({ email }, secret, jwtConfig);
  return token;
};

module.exports = {
    createToken
}