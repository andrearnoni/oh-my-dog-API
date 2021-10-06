const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createDogProfile = async (data) => {
  const db = await connection();
  const dogRegistry = await db.collection('dogs')
    .insertOne(data);

  return dogRegistry;
};

module.exports = {
  createDogProfile,
};