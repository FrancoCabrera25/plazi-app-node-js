const productRouter = require('./products.router');
const userRouter = require('./users.router');
const express = require('express');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', userRouter);
}

module.exports = routerApi;
