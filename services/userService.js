require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');

const secret = process.env.SECRET;
const expire = process.env.EXPIRE;
const alg = process.env.ALG;

const jwtConfig = {
  expiresIn: expire,
  algorithm: alg,
};

const validateFieldsCreate = (email, username, password) => {
  if (!email || !username || !password) return false;
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

  return true;
};

const validateFieldsLogin = (email, password) => {
  if (!email || !password) return false;

  return true;
};

const createUser = async ({ email, username, password, role }) => {
  const emailExists = await UsersModel.emailExists(email);
  const usernameExists = await UsersModel.usernameExists(username);
  const validation = validateFieldsCreate(email, username, password);

  if (emailExists || usernameExists) return null;
  if (!validation) return false;

  return UsersModel.createUser({ email, username, password, role });
};

const loginUser = async (email, password) => {
  const validation = validateFieldsLogin(email, password);
  const userSearch = await UsersModel.loginUser(email);

  if (!validation) return false;

  if (!userSearch || userSearch.password !== password) return null;

  const { _id: id, username, role } = userSearch;
  const userWithoutPassword = {
    id,
    username,
    email,
    role,
  };

  const token = jwt.sign({ data: userWithoutPassword }, secret, jwtConfig);

  return token;
};

module.exports = {
  createUser,
  loginUser,
}