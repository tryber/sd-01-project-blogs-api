'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    const PostTable = queryInterface.createTable("Posts", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      userId: {
        type: DataTypes.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
        allowNull: false,
        onDelete: 'CASCADE'
      },
      published: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });

    return PostTable;
  },
  down: async (queryInterface) => queryInterface.dropTable("Posts")
};
