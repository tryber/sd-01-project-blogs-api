"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          displayName: "Leonardo",
          email: "leo@test.com",
          image: 'http://localhost:3000/Leonardo.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          displayName: "JEduardo",
          email: "edu@test.com",
          image: 'http://localhost:3000/JEduardo.png',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
