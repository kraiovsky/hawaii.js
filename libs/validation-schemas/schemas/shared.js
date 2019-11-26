const Joi = require('@hapi/joi')

const QUERY_FIELDS_VALIDATION_REGEX = /^,?(\w+,?)*$/

const URL_SCHEMA = Joi.string().uri()

const UUID_SCHEMA = Joi.string().guid({
  version: ['uuidv4'],
})

const EMAIL_SCHEMA = Joi.string()
  .lowercase()
  .email({ minDomainSegments: 2 })

const QUERY_FIELDS_SCHEMA = Joi.string()
  .regex(QUERY_FIELDS_VALIDATION_REGEX)
  .allow('')

const BOOLEAN_SCHEMA = Joi.boolean()

const DATE_RANGE = Joi.string().regex(/^([0-2][0-9]|(3)[0-1])-(((0)[0-9])|((1)[0-2]))-\d{4}$/)

module.exports = {
  URL_SCHEMA,
  UUID_SCHEMA,
  EMAIL_SCHEMA,
  QUERY_FIELDS_SCHEMA,
  BOOLEAN_SCHEMA,
  DATE_RANGE,
}
