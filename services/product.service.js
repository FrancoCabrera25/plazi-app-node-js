const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class ProductsService {
  constructor() {}

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const products = await models.Product.findAll({
      include: ['category'],

    });
    return products;
  }

  async findOne(id) {
    const product = await models.Category.findByPk(id);

    if (!product) {
      throw boom.notFound('Producto no encontrado');
    }
    return product;
  }

  async update(id, data) {
    const productUpdate = await this.findOne(id);
    const result = await await productUpdate.update(data);
    return result;
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return id;
  }
}

module.exports = ProductsService;
