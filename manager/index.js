const UserRepository = require('../infrastructure/user/UserRepository');
const PostRepository = require('../infrastructure/post/PostRepository');

const verifyData = (data, payload) => {
  return data.displayName === payload.displayName && data.email === payload.email;
};

const createPost = async (blog, payload) => {
  const Post = new PostRepository();
  const users = await Post.create(blog, payload);
  return users;
};

exports.validateAndCreate = async (blog, payload) => {
  try {
    const User = await new UserRepository().getById(payload.id);
    const data = User.data();
    if (!verifyData(data, payload)) {
      const invalidToken = new Error('InvalidToken');
      invalidToken.details = `Token Invalido.`;
      throw invalidToken;
    }
    return createPost(blog, payload);
  } catch (err) {
    console.log(err.details)
    throw err;
  }
}

