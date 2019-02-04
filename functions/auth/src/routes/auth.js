const Router = require('koa-joi-router')
const validateReqRes = require('@hypefight/req-res-validator')
const { SignTransportReq } = require('@hypefight/auth-client')
const {
  LOGIN_REQ_BODY,
  RES_AUTH_HEADERS_VALIDATION,
  RES_ERROR_VALIDATION,
} = require('@hypefight/req-res-validator/schemas')
const {
  CONFIRM_REQ_PARAMS,
  REFRESH_REQ_BODY,
  AUTH_RES_BODY,
  LOGIN_RES_BODY,
} = require('../schemas/auth-validators')
const {
  createUser,
  genConfirmToken,
  genClaimFromToken,
  genAccessRefreshTokens,
  upsertToken,
  updateToken,
  respondWithTokens,
  sendMagicLink,
} = require('../controllers/auth')

const auth = new Router()

auth.route({
  method: 'post',
  path: '/login',
  validate: {
    body: LOGIN_REQ_BODY,
    type: 'json',
    output: {
      '200, 201': {
        body: LOGIN_RES_BODY,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
    continueOnError: true,
  },
  handler: [validateReqRes(), SignTransportReq(), createUser(), genConfirmToken(), sendMagicLink()],
})

auth.route({
  method: 'get',
  path: '/confirm',
  validate: {
    query: CONFIRM_REQ_PARAMS,
    output: {
      '200': {
        headers: RES_AUTH_HEADERS_VALIDATION,
        body: AUTH_RES_BODY,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
    continueOnError: true,
  },
  handler: [
    validateReqRes(),
    genClaimFromToken(),
    genAccessRefreshTokens(),
    upsertToken(),
    respondWithTokens(),
  ],
})

auth.route({
  method: 'post',
  path: '/refresh',
  validate: {
    body: REFRESH_REQ_BODY,
    type: 'json',
    output: {
      '200': {
        headers: RES_AUTH_HEADERS_VALIDATION,
        body: AUTH_RES_BODY,
      },
      '400-599': {
        body: RES_ERROR_VALIDATION,
      },
    },
    continueOnError: true,
  },
  handler: [
    validateReqRes(),
    genClaimFromToken(),
    genAccessRefreshTokens(),
    updateToken(),
    respondWithTokens(),
  ],
})

module.exports = auth
