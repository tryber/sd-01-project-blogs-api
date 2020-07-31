'use strict';

const factory = (DataTypes) => ({
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

module.exports = {
  up: async (queryInterface, DataTypes) =>
    queryInterface.createTable('BlogPosts', factory(DataTypes)),
  down: async (queryInterface) => queryInterface.dropTable('BlogPosts'),
};
