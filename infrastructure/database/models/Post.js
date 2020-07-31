const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    content: {
      type: DataTypes.STRING,
      validate: {
        notNull: false
      }
    },
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  }, {
    updatedAt: 'updated',
    createdAt: 'published'
  });
  return Post;
};

module.exports = Post;
