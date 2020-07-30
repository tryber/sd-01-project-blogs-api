function isEmailValid(email = '') {
  const regex = /^[\w+.]+@\w+\.\w{2,}(?:\.\w{2})?$/;
  return regex.test(email);
}

function isPasswordValid(password = '') {
  const regex = /(^\d{6})+$/;
  return regex.test(password);
}

function isNameValid(name = '') {
  const regex = /^[a-zA-Z-\s]{3,40}$/;
  return regex.test(name);
}

module.exports = {
  isEmailValid,
  isPasswordValid,
  isNameValid,
}
