const Joi = require('joi')
const { RES_JSON_API_SCHEMA } = require('@hypefight/req-res-validator/schemas')

const USER = Joi.object()
  .keys({
    type: Joi.string()
      .valid('user')
      .required(),
    id: Joi.string().guid({
      version: ['uuidv4'],
    }),
    attributes: Joi.object()
      .keys({
        email: Joi.string(),
        name: Joi.string().allow(null),
        avatar: Joi.string()
          .uri()
          .allow(null),
        role: Joi.string().valid('user', 'admin'),
      })
      .required(),
    relationships: Joi.object(),
    links: Joi.object().keys({
      self: Joi.string(),
    }),
  })
  .required()

module.exports.USER_PROFILE_RES_SUCCESS = RES_JSON_API_SCHEMA(USER)
