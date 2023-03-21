const Joi = require('joi');

const customerId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer();

const id = Joi.number().integer();

const getOrderSchema = Joi.object({
  id: id.required(),
});

const createOrderSchema = Joi.object({
  customerId,
});

const addItemSchema =Joi.object({
  orderId:id,
  productId,
  amount
});

exports.module = {
  createOrderSchema,
  getOrderSchema,
  addItemSchema
};
