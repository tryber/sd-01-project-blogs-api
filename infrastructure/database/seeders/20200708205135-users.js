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
         password: '123456'
        },
        {
          displayName: 'Gabriel Coruja',
          email: 'coruja@test.com',
          image: 'http://locallhost:3000/coruja.png',
          password: '654321'
        },
        {
          displayName: 'Ladrao de Sarzedo',
          email: 'victor@test.com',
          image: 'http://locallhost:3000/victor.png',
          password: '321456'
        },
      ],
      {},
    );
  },

  down: async queryInterface => queryInterface.bulkDelete('Users', null, {}),
};
