const express = require('express');
const UserRepository = require('../../infrastructure/user/UserRepository');
const User = require('../../domain/user');

exports.getAllUser = async (_req, res) => {
  const users = await new UserRepository().getAllUser();

  res.status(200).json(users);
};

exports.createUser = async (req, res) => {
  const newUser = await new UserRepository().createUser(req.body);

  res.status(200).json(newUser);
};

exports.login = async (req, res) => {
  const newLogin = await new UserRepository().login(req.body);

  res.status(200).json(newLogin);
}
