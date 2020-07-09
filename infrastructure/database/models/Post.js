const Post = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    timestamps: false,
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    published: Sequelize.DATE,
    updated: Sequelize.DATE
  },{
    updatedAt: 'updated',
    createdAt: 'published'
  });
  return Post;
};

module.exports = Post;
