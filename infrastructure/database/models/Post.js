const Post = (sequelize, DataTypes) => {
    const Post = sequelize.define(
      'Post',
      {
        title: DataTypes.STRING,
        content: DataTypes.STRING,
        idUser: DataTypes.NUMBER,
      },
    );
    return Post;
  };
  
  module.exports = Post;