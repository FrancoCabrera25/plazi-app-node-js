const { models } = require('../libs/sequelize');
class UsersService {
  async find() {
    const result = await models.User.findAll();
    return result;
  }
}

module.exports = UsersService;
