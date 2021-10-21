const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const { upload } = require('../../middlewares/multer');

const userController = require('../../controllers/userController');
const dogController = require('../../controllers/dogController');
const validateJWT = require('../../middlewares/validateJWT');

app.use(cors());
app.use(express.json());
app.use('/images', express.static(path.resolve('src/uploads')));

app.get('/user', validateJWT, userController.getUser);
app.get('/dogs/:id', dogController.getDogById);
app.get('/dogs', dogController.getAllDogs);
app.post('/users', userController.createUser);
app.post('/login', userController.loginUser);
app.post('/dogs', validateJWT, dogController.createDogProfile);
app.put('/dog/:id/image/all', validateJWT, upload.array('images'),
  dogController.insertDogImage);
app.put('/dog/:id/image', validateJWT, upload.single('image'),
  dogController.updateDogImage);
app.put('/dog/:id', validateJWT, dogController.updateDogProfile);

module.exports = app;