const express = require('express');
const CustomersService = require('../services/customer.service');

const router = express.Router();
const customerService = new CustomersService();
const validatorsHandler = require('../middlewares/validators.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');

router.get('/', async (req, res, next) => {
  try {
    const users = await customerService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get(
  '/:id',
  validatorsHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await customerService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorsHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await customerService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorsHandler(getCustomerSchema, 'params'),
  validatorsHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await customerService.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorsHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await customerService.delete(id);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
