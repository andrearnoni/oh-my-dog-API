const DogsModel = require('../models/dogModel');

const validateFields = (name, weight, age) => {
  if (!name || !weight || !age) return false;

  return true;
};

const createDogProfile = async ({ name, weight, age, userId }) => {
  const validation = validateFields(name, weight, age);

  if (!validation) return false;

  return DogsModel.createDogProfile({ name, weight, age, userId });
};

module.exports = {
  createDogProfile,
};