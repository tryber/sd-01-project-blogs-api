const UserRepository = require('../../infrastructure/user/UserRepository');
const { createTokenJWT } = require('../../services/jwt');

exports.getAllUser = async (_req, res) => {
  const users = await new UserRepository().getAllUser();

  res.status(200).json(users);
};

exports.createUser = async (req, res) => {
  const newUser = await new UserRepository().createUser(req.body);

  res.status(200).json(newUser);
};

exports.UserById = async (req, res) => {
  const detailUser = await new UserRepository().getById(req.params.id);
  res.status(200);
  res.json(detailUser);
};

exports.deleteUser = async (req, res) => {
  await new UserRepository().remove(req.params.id);
  res.status(200).json({ message: 'Usuário excluído com sucesso!'});
};

exports.login = async (req, res) => {
  const newLogin = await new UserRepository().login(req.body);

  const { id, displayName, email } = newLogin;

  const token = createTokenJWT({ id, displayName, email });

  res.status(200).json({ token });
}
