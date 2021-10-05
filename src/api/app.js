const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const { upload } = require('../../middlewares/multer');

const userController = require('../../controllers/userController');
const validateJWT = require('../../middlewares/validateJWT');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.resolve('src/uploads')));

app.get('/user', validateJWT, userController.getUser);
app.post('/users', userController.createUser);
app.post('/login', userController.loginUser);

module.exports = app;