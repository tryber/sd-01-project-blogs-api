const LIMIT_CARACTERS_MYSQL = 255;

function isTitleValid(title = '') {
  const limitCaractersTitle = 100; 
  return title.length <= limitCaractersTitle;
}

function isContentValid(content = '') {
  return content.length <= LIMIT_CARACTERS_MYSQL;
}

module.exports = {
  isTitleValid,
  isContentValid,
}
