require('dotenv').config();
const jwt = require('jsonwebtoken');
const service = require('../services/userService');
const messages = require('../helpers/validationMessages');

const secret = process.env.SECRET;

const createUser = async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const result = await service.createUser({ email, username, password, role: 'user' });

    if (result === false) return res.status(400).json(messages.INVALID_ENTRY);

    if (result === null) return res.status(409).json(messages.EMAIL_OR_USERNAME);

    return res.status(201).json(result);
  } catch (err) {
    return res.status(500).json(messages.ERROR);
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await service.loginUser(email, password);
    const token = result;

    if (result === false) return res.status(401).json(messages.MUST_BE_FILLED);
    if (result === null) return res.status(401).json(messages.INCORRECT_DATA);

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

const getUser = async (req, res) => {
  try {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, secret);
  const { id, username, email, role } = decoded.data;

  return res.status(200).json({
    id,
    username,
    email,
    role, 
  }); 
  } catch (error) {
    return res.status(500).json(messages.ERROR);
  }
};

module.exports = {
  createUser,
  loginUser,
  getUser,
}