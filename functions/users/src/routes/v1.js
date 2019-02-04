const Router = require('koa-joi-router')
const users = new Router()
const { createUser, findUser } = require('../controllers/v1')
const validateReqRes = require('@hypefight/req-res-validator')
const { Authenticate, Authorize } = require('@hypefight/auth-client')
const { USER_PROFILE_RES_SUCCESS } = require('../schemas/users-validators')
const {
  LOGIN_REQ_BODY,
  REQ_AUTH_HEADERS_VALIDATION,
  RES_ERROR_VALIDATION,
  UUID_SCHEMA,
  EMAIL_SCHEMA,
  QUERY_FIELDS_SCHEMA,
} = require('@hypefight/req-res-validator/schemas')

users.route({
  method: 'post',
  path: '/',
  validate: {
    header: REQ_AUTH_HEADERS_VALIDATION,
    body: LOGIN_REQ_BODY,
    type: 'json',
    output: {
      '200, 201': {
        body: USER_PROFILE_RES_SUCCESS,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
    continueOnError: true,
  },
  handler: [validateReqRes(), Authenticate(), Authorize(['auth']), createUser()],
})

users.route({
  method: 'get',
  path: '/:searchQuery',
  validate: {
    header: REQ_AUTH_HEADERS_VALIDATION,
    params: {
      searchQuery: [UUID_SCHEMA, EMAIL_SCHEMA],
    },
    query: {
      searchKey: /^(id|email)$/,
      'fields[users]': QUERY_FIELDS_SCHEMA,
    },
    output: {
      '200': {
        body: USER_PROFILE_RES_SUCCESS,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
    continueOnError: true,
  },
  handler: [validateReqRes(), Authenticate(), Authorize(['auth']), findUser()],
})

module.exports = users
