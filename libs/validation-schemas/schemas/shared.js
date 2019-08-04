const Joi = require('joi')

const QUERY_FIELDS_VALIDATION_REGEX = /^,?(\w+,?)*$/

const URL_SCHEMA = Joi.string().uri()

const UUID_SCHEMA = Joi.string().guid({
  version: ['uuidv4'],
})

const EMAIL_SCHEMA = Joi.string()
  .lowercase()
  .email({ minDomainAtoms: 2 })

const QUERY_FIELDS_SCHEMA = Joi.string()
  .regex(QUERY_FIELDS_VALIDATION_REGEX)
  .allow('')

module.exports = {
  URL_SCHEMA,
  UUID_SCHEMA,
  EMAIL_SCHEMA,
  QUERY_FIELDS_SCHEMA,
}
