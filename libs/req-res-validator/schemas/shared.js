const Joi = require('joi')

const QUERY_FIELDS_VALIDATION_REGEX = /^,?(\w+,?)*$/

module.exports.URL_SCHEMA = Joi.string().uri()

module.exports.UUID_SCHEMA = Joi.string().guid({
  version: ['uuidv4'],
})

module.exports.EMAIL_SCHEMA = Joi.string()
  .lowercase()
  .email({ minDomainAtoms: 2 })

module.exports.QUERY_FIELDS_SCHEMA = Joi.string()
  .regex(QUERY_FIELDS_VALIDATION_REGEX)
  .allow('')
