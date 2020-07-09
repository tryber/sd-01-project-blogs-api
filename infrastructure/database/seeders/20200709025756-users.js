"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "users",
      [
        {
          displayName: "Leonardo",
          email: "leo@test.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          displayName: "JEduardo",
          email: "edu@test.com",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("users", null, {}),
};
