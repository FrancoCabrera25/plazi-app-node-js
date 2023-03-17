const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();
const userService = new UsersService();

router.get('/', async (req, res) => {
  const data = await userService.find();
  res.json({
    data,
    //  data: products,
    //total: products.length,
  });
});

module.exports = router;
