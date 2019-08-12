const Joi = require('@hapi/joi')

module.exports.LOGIN_REQ_BODY = {
  email: Joi.string()
    .lowercase()
    .email({ minDomainSegments: 2 })
    .required(),
}
