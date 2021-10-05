const ERROR = { message: 'Ops, an error occurred with your request' };

const INVALID_ENTRY = { message: 'Invalid entries. Try again.' };

const EMAIL_OR_USERNAME = { message: 'Email or username already registered' };

const MUST_BE_FILLED = { message: 'All fields must be filled' };

const INCORRECT_DATA = { message: 'Incorrect username or password' };

const INVALID_TOKEN = { message: 'jwt malformed' };

const MISSING_TOKEN = { message: 'missing auth token' };

const RECIPE_NOT_FOUND = { message: 'recipe not found' };

const ONLY_ADMINS = { message: 'Only admins can register new admins' };

module.exports = {
  ERROR,
  INVALID_ENTRY,
  EMAIL_OR_USERNAME,
  MUST_BE_FILLED,
  INCORRECT_DATA,
  INVALID_TOKEN,
  RECIPE_NOT_FOUND,
  MISSING_TOKEN,
  ONLY_ADMINS,
};