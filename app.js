const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const api = require('./src/api');

dotenv.config();

const app = express();

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    console.log('Database connection failed');
  });

app.use(express.json());

app.use('/api', api);
