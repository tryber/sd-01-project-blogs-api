const User = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    displayName: {
      type: DataTypes.STRING,
      validate: {
        len: [1,],
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
        notNull: false
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        isUrl: true,
        notNull: false
      }
    },
  }, {
    timestamps: false,
  });

  return User;
};

module.exports = User;
