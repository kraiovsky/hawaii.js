const Joi = require('joi')

module.exports.RES_ERROR_VALIDATION = Joi.object().keys({
  errors: Joi.array().items(
    Joi.object().keys({
      status: Joi.number().required(),
      title: Joi.string().required(),
      detail: Joi.string(),
    })
  ),
})
