'use strict';

/** @type {import('sequelize-cli').Migration} */

const { OrderSchema, ORDERS_TABLE } = require('../models/order.model');
module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(ORDERS_TABLE, OrderSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(ORDERS_TABLE);
  }
};
