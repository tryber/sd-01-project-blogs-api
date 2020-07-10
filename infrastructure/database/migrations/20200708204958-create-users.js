'use strict';

const factory = DataTypes => ({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
  },
  displayName: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  image: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  password: {
    allowNull: false,
    type: DataTypes.STRING,
  },
});

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('Users', factory(DataTypes)),
  down: async queryInterface => queryInterface.dropTable('Users'),
};
