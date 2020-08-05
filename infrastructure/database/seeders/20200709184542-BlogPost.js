module.exports = {
  up: async (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      "BlogPosts",
      [
        {
          title: 'Latest updates, August 1st',
          content: 'The whole text for the blog post goes here in this key',
          user_id: 1,
        },
        {
          title: 'New Update In Blog',
          content: 'Blog post goes here in this key',
          user_id: 1,
        },
      ],
      {}
    ),

  down: async (queryInterface) => queryInterface.bulkDelete("BlogPosts", null, {}),
};
