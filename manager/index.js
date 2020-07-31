const UserRepository = require('../infrastructure/user/UserRepository');
const PostRepository = require('../infrastructure/post/PostRepository');
const { handleError } = require('./handleError');

const verifyData = (data, userData) => {
  return data.displayName === userData.displayName && data.email === userData.email;
};

const validateUserData = async (verifyUser, userData) => {
  const data = verifyUser.data();
  if (!verifyData(data, userData)) handleError({ name: 'InvalidToken' });
  return data;
}

const isOwnerPost = async (user, post) => {
  if (user.id !== post.userId) handleError({ name: 'unauthorizedError' });
  return true;
}

exports.validateAndUpdatePost = async (dataPost, userData, id) => {
  try {
    const User = await new UserRepository().getById(userData.id);
    await validateUserData(User, userData);
    const Post = await new PostRepository().getById(id);
    await isOwnerPost(User.data(), Post.data());
    return new PostRepository().update(id, dataPost)
  } catch (err) {
    handleError(err);
  }
}

exports.validateAndCreate = async (dataPost, userData) => {
  try {
    const User = await new UserRepository().getById(userData.id);
    await validateUserData(User, userData);
    const Post = new PostRepository();
    const users = await Post.create(dataPost, userData);
    return users;
  } catch (err) {
    handleError(err);
  }
}
