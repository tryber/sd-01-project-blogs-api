const parameters = (DataTypes) => ({
  displayName: {
    type: DataTypes.STRING,
    validate: {
      len: [1],
    },
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    validate: {
      isEmail: true,
      notNull: false,
    },
  },
  image: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
      notNull: false,
    },
    password: DataTypes.STRING,
  },
});

const time = {
  timestamps: false,
};

const User = (sequelize, DataTypes) =>
  sequelize.define('Users', parameters(DataTypes), time);

module.exports = User;
