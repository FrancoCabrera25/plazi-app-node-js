const express = require('express');
const UsersService = require('../services/users.service');

const router = express.Router();
const userService = new UsersService();
const validatorsHandler = require('../middlewares/validators.handler');
const { createUserSchema, getUserSchema, updateUserSchema } = require('../schemas/user.schema');

router.get('/', async (req, res, next) => {
  try {
    const users = await userService.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});


router.get(
  '/:id',
  validatorsHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await userService.findOne(id);
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/',
  validatorsHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const user = await userService.create(body);
      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }
);

router.patch(
  '/:id',
  validatorsHandler(getUserSchema, 'params'),
  validatorsHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const category = await userService.update(id, body);
      res.json(category);
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  '/:id',
  validatorsHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await userService.delete(id);
      res.status(200).json({ id });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;

// const express = require('express');
// const UserService = require('./../services/user.service');
// const validatorHandler = require('./../middlewares/validator.handler');
// const {
//   updateUserSchema,
//   createUserSchema,
//   getUserSchema,
// } = require('./../schemas/user.schema');
// const router = express.Router();
// const service = new UserService();
// router.get('/', async (req, res, next) => {
//   try {
//     const users = await service.find();
//     res.json(users);
//   } catch (error) {
//     next(error);
//   }
// });
// router.get(
//   '/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const category = await service.findOne(id);
//       res.json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.post(
//   '/',
//   validatorHandler(createUserSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const body = req.body;
//       const newCategory = await service.create(body);
//       res.status(201).json(newCategory);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.patch(
//   '/:id',
//   validatorHandler(getUserSchema, 'params'),
//   validatorHandler(updateUserSchema, 'body'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       const body = req.body;
//       const category = await service.update(id, body);
//       res.json(category);
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// router.delete(
//   '/:id',
//   validatorHandler(getUserSchema, 'params'),
//   async (req, res, next) => {
//     try {
//       const { id } = req.params;
//       await service.delete(id);
//       res.status(201).json({ id });
//     } catch (error) {
//       next(error);
//     }
//   }
// );
// module.exports = router;
