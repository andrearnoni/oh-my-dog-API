const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllDogs = async () => {
  const db = await connection();

  const dogs = await db.collection('dogs').find().toArray();

  return dogs;
};

const getDogById = async (id) => {
  const db = await connection();
  const dog = await db.collection('dogs').findOne(ObjectId(id));

  if (!dog) return null;

  return dog;
};

const createDogProfile = async (data) => {
  const db = await connection();
  const dogRegistry = await db.collection('dogs')
    .insertOne(data);

  return dogRegistry;
};

const updateDogProfile = async ({ id, name, weight, age }) => {
  const db = await connection();
  
  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('dogs')
    .updateOne({ _id: ObjectId(id) }, { $set: { name, weight, age } });

  return result;
};

const updateDogImage = async ({ id, image }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('dogs')
    .updateOne({ _id: ObjectId(id) }, { $set: { image } });

  return result;
};

const insertDogImage = async ({ id, image }) => {
  const db = await connection();

  if (!ObjectId.isValid(id)) return null;

  const result = await db.collection('dogs')
    .updateOne({ _id: ObjectId(id) }, { image });

  return result;
};

module.exports = {
  getAllDogs,
  getDogById,
  createDogProfile,
  updateDogProfile,
  updateDogImage,
  insertDogImage,
};