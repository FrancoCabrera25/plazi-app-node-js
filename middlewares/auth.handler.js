const boom = require('@hapi/boom');
const { config } = require('../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  apiKey === config.apiKey
    ? next()
    : next(boom.unauthorized('no esta autorizado. falta api key en headers'));
};

module.exports = {
  checkApiKey,
};
