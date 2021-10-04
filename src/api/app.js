const express = require('express');
const path = require('path');

const app = express();
const { upload } = require('../../middlewares/multer');

app.use(express.json());
app.use('/images', express.static(path.resolve('src/uploads')));

module.exports = app;