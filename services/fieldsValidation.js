exports.isEmailValid = (email = '') => {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(regex);
}

exports.isPasswordValid = (password = '') => {
  const regex = /(^[0-9]{6,63})+$/;
  return password.match(regex);
}
