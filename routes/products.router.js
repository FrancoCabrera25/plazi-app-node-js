const express = require('express');
const ProductsService = require('../services/product.service');
const validatorsHandler = require('../middlewares/validators.handler');
const {
  getProductSchema,
  createProductSchema,
  updateProductSchema,
} = require('../schemas/product.schema');

const router = express.Router();
const service = new ProductsService();

router.get('/', async (req, res) => {
  const products = await service.find();
  res.json({
    data: products,
    //total: products.length,
  });
});

router.get('/filter', (req, res) => {
  res.send('filtro de productos');
});

router.get(
  '/:id',
  validatorsHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const product = await service.findOne(id);
      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
validatorsHandler(createProductSchema, 'body'),
async (req, res) => {
  const body = req.body;
  const newProduct = await service.create(body);
  res.status(201).json({
    message: 'creadted',
    newProduct,
  });
});

router.patch('/:id',
validatorsHandler(getProductSchema, 'params'),
validatorsHandler(updateProductSchema, 'body'),
async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const productUpdated = await service.update(id, body);
    res.json({
      message: 'update for patch',
      productUpdated,
    });
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  const result = await service.delete(id);
  res.json({
    result,
  });
});

module.exports = router;
