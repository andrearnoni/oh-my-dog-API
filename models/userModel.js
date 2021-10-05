const connection = require('./connection');
const getDate = require('../middlewares/registeredDate');

const emailExists = async (email) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ email });

  return user !== null;
};

const usernameExists = async (username) => {
  const db = await connection();
  const user = await db.collection('users').findOne({ username });

  return user !== null;
};

const createUser = async ({ email, username, password, role }) => {
  const db = await connection();
  const registered = getDate();
  const userRegistry = await db.collection('users')
    .insertOne({ email, username, password, role, registered });

  return {
    user: {
      email,
      username,
      role,
      registered,
      _id: userRegistry.insertedId,
    },
  };
};

const loginUser = async (email) => {
  const db = await connection();
  const userData = await db.collection('users').findOne({ email });

  return userData;
};

module.exports = {
  emailExists,
  usernameExists,
  createUser,
  loginUser,
}