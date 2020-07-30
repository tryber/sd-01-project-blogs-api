const Manager = require('../../manager');
const PostRepository = require('../../infrastructure/post/PostRepository');
const service = require('../../infrastructure/post/servicePost');

exports.createPost = (req, res, next) => {
  const { payload, body } = req
  const { title, content } = body;
  if (!service.validatePost({ title, content })) return res.status(500).json({ message: 'Campos invalidos' });
  Manager.validateAndCreate({ title, content }, payload).then((post) => {
    res.status(201).json(post);
  })
    .catch((e) => {
      console.log(e.message);
      res.status(401).json({ message: 'Algo deu errado' });
    });
};

exports.getAllPost = (req, res, next) => {
  new PostRepository()
    .getAll()
    .then((post) => {
      const allPost = post.map((p) => p.data());
      res.status(200).json(allPost);
    })
    .catch((e) => {
      console.log(e.message);
      res.status(401).json({ message: 'Algo deu errado', trace: e.trace });
    });
};

exports.updatePost = (req, res, next) => {
  const { payload, body } = req
  const { title, content } = body;
  const { id } = req.params;
  if (!service.validatePost({ title, content })) return res.status(500).json({ message: 'Campos inválidos' });
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
