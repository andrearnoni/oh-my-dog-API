const model = require('../models/userModel');
const service = require('../services/userService');
const messages = require('../helpers/validationMessages');

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

module.exports = {
  createUser,
}