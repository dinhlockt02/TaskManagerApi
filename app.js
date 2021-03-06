const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const api = require('./src/api');
const swaggerDocument = require('./swagger.json');

dotenv.config();

const app = express();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use('/api/v1', api);

app.use((req, res) => {
  res.status(404).json({ message: 'Resource not found' });
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  let { statusCode } = err;
  if (!statusCode) {
    statusCode = 500;
  }
  res.status(statusCode).json({ message: err.message });
});

mongoose
  .connect(process.env.MONGOURI)
  .then(() => {
    app.listen(process.env.PORT);
  })
  .catch(() => {
    console.log('Database connection failed');
  });
