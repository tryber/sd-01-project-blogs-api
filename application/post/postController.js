const Manager = require('../../manager');
const PostRepository = require('../../infrastructure/post/PostRepository');
const service = require('../../infrastructure/post/servicePost');

exports.createPost = (req, res, next) => {
  const { payload, body } = req
  const { title, content } = body;
  if (!service.validatePost({ title, content })) return res.status(500).json({ message: 'Campos invalidos' });
  Manager.validateAndCreate({ title, content }, payload).then((post) => {
    res.status(200).json(post);
  })
    .catch((e) => {
      console.log(e.message);
      res.status(500).json({ message: 'Algo deu errado' });
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
      res.status(500).json({ message: 'Algo deu errado' });
    });
};
