const Joi = require('joi')

module.exports.LOGIN_REQ_BODY = {
  email: Joi.string()
    .lowercase()
    .email({ minDomainAtoms: 2 })
    .required(),
}
