const Manager = require('../../manager');
const PostRepository = require('../../infrastructure/post/PostRepository');
const service = require('../../infrastructure/post/servicePost');
const { handleError } = require('../../manager/handleError');

exports.createPost = (req, res, next) => {
  const { payload, body } = req
  const { title, content } = body;
  if (!service.validatePost({ title, content })) handleError({ name: 'invalidFields' });
  Manager.validateAndCreate({ title, content }, payload).then((post) => {
    res.status(201).json(post);
  })
    .catch((err) => next(err));
};

exports.getAllPost = (req, res, next) => {
  new PostRepository()
    .getAll()
    .then((post) => {
      const allPost = post.map((p) => p.data());
      res.status(200).json(allPost);
    })
    .catch((err) => next(err));
};

exports.updatePost = (req, res, next) => {
  const { payload, body } = req
  const { title, content } = body;
  const { id } = req.params;
  if (!service.validatePost({ title, content })) handleError({ name: 'invalidFields' });
  Manager.validateAndUpdatePost({ title, content }, payload, id).then((post) => {
    res.status(200).json(post);
  })
    .catch((err) => next(err));
};

exports.getOnePostById = (req, res, next) => {
  const { id } = req.params;
  new PostRepository()
    .getById(id)
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => next(err));
}

exports.getPostsByTerm = (req, res, next) => {
  const { searchTerm } = req.query;
  new PostRepository()
    .getByTerm(searchTerm)
    .then((post) => {
      const allPost = post.map((p) => p.data());
      res.status(200).json(allPost);
    })
    .catch((err) => next(err));
}

exports.removePost = (req, res, next) => {
  const { id: idPost } = req.params;
  const { id } = req.payload;
  new PostRepository()
    .remove(idPost, id)
    .then((value) => {
      res.status(200).json(value);
    })
    .catch((err) => next(err));
}
