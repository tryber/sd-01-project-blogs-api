const path = require('path');
const jwt = require('jsonwebtoken');

const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');

require('dotenv').config({ path: enviromentVariable });

const tokenValid = (token) => {
  const payload = jwt.verify(token, process.env.SECRET_KEY_JWT);
  return payload;
};

module.exports = tokenValid;
