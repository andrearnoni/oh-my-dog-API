const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const { upload } = require('../../middlewares/multer');

app.use(express.json());
app.use('/images', express.static(path.resolve('src/uploads')));

app.get('/', (req, res) => {
  res.status(200).json({ message: "Olá mundo" })
})

module.exports = app;