'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const UsersTable = queryInterface.createTable("Users", {
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
        unique: true,
      },
      image: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    })

    return UsersTable;
  },

  down: async (queryInterface) => queryInterface.dropTable("Posts")
    .then(() => queryInterface.dropTable("Users")),
};
