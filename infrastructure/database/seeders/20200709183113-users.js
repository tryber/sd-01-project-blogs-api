'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          displayName: "Leonardo",
          email: "leo@test.com",
          image: "https://www.google.com",
        },
        {
          displayName: "Leonardo2",
          email: "leo2@test.com",
          image: "https://www.google.com",
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
