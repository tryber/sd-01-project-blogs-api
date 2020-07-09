'use strict';

module.exports = {
  up: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkInsert(
      'Users',
      [
        {
          displayName: 'Doug Funny',
          email: 'doug@gmail.com',
          image: 'http://locallhost:3000/doug.png',
        },
        {
          displayName: 'Gabriel Coruja',
          email: 'coruja@test.com',
          image: 'http://locallhost:3000/coruja.png',
        },
        {
          displayName: 'Ladrao de Sarzedo',
          email: 'victor@test.com',
          image: 'http://locallhost:3000/victor.png',
        },
      ],
      {},
    );
  },

  down: async queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
