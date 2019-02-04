const Joi = require('joi')

const JWT_REGEX_WITH_BEARER = /^Bearer ([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_=]+)\.([a-zA-Z0-9_\-+/=]*)/

module.exports.REQ_AUTH_HEADERS_VALIDATION = Joi.object({
  authorization: Joi.string()
    .regex(JWT_REGEX_WITH_BEARER)
    .required(),
}).options({
  allowUnknown: true,
})

module.exports.RES_AUTH_HEADERS_VALIDATION = Joi.object({
  'cache-control': Joi.string()
    .valid('no-store')
    .required(),
  pragma: Joi.string()
    .valid('no-cache')
    .required(),
}).options({
  allowUnknown: true,
})
