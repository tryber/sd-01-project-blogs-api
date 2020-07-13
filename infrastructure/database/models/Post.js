const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: DataTypes.DATE,
    updated: DataTypes.DATE
  },{
    updatedAt: 'updated',
    createdAt: 'published'
  });
  return Post;
};

module.exports = Post;
