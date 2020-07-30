const parameters = (DataTypes) => ({
  title: {
    type: DataTypes.STRING,
    validate: {
      notNull: false,
    },
  },
  content: {
    type: DataTypes.STRING,
    validate: {
      notNull: false,
    },
  },
  userId: DataTypes.INTEGER,
  published: DataTypes.DATE,
  updated: DataTypes.DATE,
});

const time = {
  updatedAt: 'updated',
  createdAt: 'published',
};

const BlogPosts = (sequelize, DataTypes) =>
  sequelize.define('BlogPosts', parameters(DataTypes), time);

module.exports = BlogPosts;
