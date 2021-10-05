require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');

const secret = process.env.SECRET;

const jwtConfig = process.env.JWT_CONFIG;

const validateFieldsCreate = (email, username, password) => {
  if (!email || !username || !password) return false;
  if (!(/^[^\s@]+@[^\s@]+\.[^\s@]+$/).test(email)) return false;

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

module.exports = {
  validateFieldsCreate,
  createUser,
}