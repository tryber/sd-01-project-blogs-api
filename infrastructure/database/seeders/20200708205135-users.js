'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
   return queryInterface.bulkInsert(
    "Users",
    [
      {
        fullName: "Leonardo",
        email: "leo@test.com",
      },
      {
        fullName: "JEduardo",
        email: "edu@test.com",
      },
    ],
    {}
  )
  },

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
