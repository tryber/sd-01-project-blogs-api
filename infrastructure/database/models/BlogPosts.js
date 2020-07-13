const BlogPosts = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'BlogPosts',
    {
      title: DataTypes.STRING,
      content: DataTypes.STRING,
      user_id: DataTypes.NUMBER,
      published: DataTypes.DATE,
      updated: DataTypes.DATE,
    },
    {
      updatedAt: 'updated',
      createdAt: 'published',
    },
  );
  return Post;
};

module.exports = BlogPosts;
