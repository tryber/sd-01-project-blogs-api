const CryptoJS = require('crypto-js');
const path = require('path');

const enviromentVariable = path.resolve(__dirname, '..', '..', '.env');

require('dotenv').config({ path: enviromentVariable });

function encrypt(password) {
  const passwordEncrypt = CryptoJS.AES.encrypt(JSON.stringify(password),
    process.env.SECRET_KEY_CRYPTO).toString();
  return passwordEncrypt;
}

function decrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, process.env.SECRET_KEY_CRYPTO);
  const decryptedPassword = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedPassword;
}

module.exports = { encrypt, decrypt };
