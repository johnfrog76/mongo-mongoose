require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

// const mongoPractice = require('./mongo');
const mongoPractice = require('./mongoose');
const HttpError = require('./models/http-error');

const app = express();

// CORS Headers => Required for cross-origin/ cross-server communication
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, PATCH, DELETE, OPTIONS'
    );
    next();
});

app.use(bodyParser.json());

app.post('/products', mongoPractice.createProduct);

app.get('/products', mongoPractice.getProducts);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    throw error;
});
  
app.use((error, req, res, next) => {
    if (res.headerSent) {
      return next(error);
    }
    res.status(error.code || 500);
    res.json({ message: error.message || 'An unknown error occurred!' });
});

// console.log('port is: ' + process.env.PORT)
app.listen(process.env.PORT || 5000);