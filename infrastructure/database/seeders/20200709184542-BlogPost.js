module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'BlogPost',
      [
        {
          published: new Date(),
          updated: new Date(),
          title: 'Latest updates, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          user_id: 1,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, _Sequelize) => {
    return queryInterface.bulkDelete('BlogPost', null, {});
  },
};
