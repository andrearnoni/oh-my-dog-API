const DogsModel = require('../models/dogModel');

const validateFields = (name, weight, age) => {
  if (!name || !weight || !age) return false;

  return true;
};

const getAllDogs = async () => {
  const dogs = await DogsModel.getAllDogs();

  return dogs;
};

const getDogById = async (id) => {
  const dog = await DogsModel.getDogById(id);

  if (!dog) return null;

  return dog;
};

const createDogProfile = async ({ name, weight, age, userId }) => {
  const validation = validateFields(name, weight, age);

  if (!validation) return false;

  return DogsModel.createDogProfile({ name, weight, age, userId });
};

const updateDogProfile = async ({ id, name, weight, age }) => {
  const validation = validateFields(name, weight, age);

  if (!validation) return false;

  return DogsModel.updateDogProfile({ id, name, weight, age });
};

const updateDogImage = async ({ id, image }) => DogsModel
  .updateDogImage({ id, image });

const insertDogImage = async ({ id, image }) => DogsModel
  .insertDogImage({ id, image });  

module.exports = {
  getAllDogs,
  getDogById,
  createDogProfile,
  updateDogProfile,
  updateDogImage,
  insertDogImage,
};