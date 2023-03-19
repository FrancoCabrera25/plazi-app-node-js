const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  async find() {
    const result = await models.Customer.findAll();
    return result;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Cliente no encontrado');
    }
    return customer;
  }

  async create(data) {
    const newCustomer = await models.Customer.create(data);
    return newCustomer;
  }

  async update(id, data) {
    const customerUpdate = await this.findOne(id);
    const result = await await customerUpdate.update(data);
    return result;
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return id;
  }
}

module.exports = CustomerService;
