const User = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    displayName: DataTypes.STRING,
    email: DataTypes.STRING,
  });
  console.log('retorno', User)

  return User;
};

module.exports = User;
