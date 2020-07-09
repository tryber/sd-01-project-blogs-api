'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "Users",
      [
        {
          displayName: "Leonardo",
          email: "leo@test.com",
          image: "showshow",
        },
        {
          displayName: "Leonardo2",
          email: "leo2@test.com",
          image: "show2show",
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
