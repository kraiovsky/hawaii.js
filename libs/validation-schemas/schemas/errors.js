const Joi = require('joi')

module.exports.RES_ERROR_VALIDATION = Joi.object().keys({
  statusCode: Joi.number().required(),
  error: Joi.string().required(),
  message: Joi.string().required(),
})
