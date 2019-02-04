const Joi = require('joi')
const { JWT_REGEX } = require('../../config/constants')

const JWT = Joi.string()
  .regex(JWT_REGEX)
  .required()

const CONFIRM_REQ_PARAMS = {
  token: JWT,
}

const REFRESH_REQ_BODY = {
  refresh_token: JWT,
}

const LOGIN_RES_BODY = {
  status: 'OK',
  message: 'confirmation token sent',
}

const AUTH_RES_BODY = {
  access_token: JWT,
  token_type: Joi.string()
    .valid('Bearer')
    .required(),
  expires_in: Joi.number().required(),
  refresh_token: JWT,
}

module.exports = {
  CONFIRM_REQ_PARAMS,
  REFRESH_REQ_BODY,
  LOGIN_RES_BODY,
  AUTH_RES_BODY,
}
