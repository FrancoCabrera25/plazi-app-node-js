const boom = require('@hapi/boom');

const { models } = require('./../libs/sequelize');

class OrderService {
  constructor() {}
  async create(data) {
    const newOrder = await models.Order.create(data);
    return newOrder;
  }

  async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async find() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: ['customer'],
    });

    if (!order) {
      throw boom.notFound('Orden no encontrada');
    }
    return order;
  }

  async update(id, data) {
    const orderUpdate = await this.findOne(id);
    const result = await await orderUpdate.update(data);
    return result;
  }

  async delete(id) {
    const category = await this.findOne(id);
    await category.destroy();
    return id;
  }
}

module.exports = OrderService;
