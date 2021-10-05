require('dotenv').config();
const jwt = require('jsonwebtoken');
const UsersModel = require('../models/userModel');

const secret = process.env.SECRET;

const jwtConfig = process.env.JWT_CONFIG;