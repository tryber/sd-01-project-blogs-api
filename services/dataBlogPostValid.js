function isTitleValid(title = '') {
  const regex = /^{1,100}$/;
  return regex.test(title);
}

function isContentValid(content = '') {
  const regex = /^{1,255}$/;
  return regex.test(content);
}

module.exports = {
  isTitleValid,
  isContentValid,
}
