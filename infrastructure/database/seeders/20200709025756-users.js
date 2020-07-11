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
          password: 'U2FsdGVkX18c/ARm7s3TOVG/zPOjBc5xo/FbiC+OyX4=',
        },
        {
          displayName: "JEduardo",
          email: "edu@test.com",
          image: 'http://localhost:3000/JEduardo.png',
          password: 'U2FsdGVkX18c/ARm7s3TOVG/zPOjBc5xo/FbiC+OyX4=',
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("Users", null, {}),
};
