const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  async find() {
    const result = await models.User.findAll({
      include: ['customer']
    });
    return result;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    console.log('user', user);
    if (!user) {
      throw boom.notFound('Usuario no encontrado');
    }
    return user;
  }

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async update(id, data) {
    const userUpdate = await this.findOne(id);
    const result = await await userUpdate.update(data);
    return result;
  }

  async delete(id) {
    const user = await this.findOne(id);
    await user.destroy();
    return id;
  }
}

module.exports = UsersService;
