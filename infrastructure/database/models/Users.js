const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'Users',
    {
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  return User;
};

module.exports = User;
