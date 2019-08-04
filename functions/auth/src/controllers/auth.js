/**
 * @file Authentication controller
 */
const ms = require('ms')
const { generateToken, verifyToken } = require('@hypefight/auth-client/libs/token')
const email = require('@hypefight/email-client')
const Users = require('../api/users')
const Tokens = require('../queries/tokens')
const generateEmail = require('../../email-templates')
const { INVALID_TOKEN } = require('../../config/errors')

/**
 * Takes user params from request body and tries to create a user.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Save new or existing user data and whether it was created in ctx state, and pass down to the next middleware.
 */
const createUser = () => async (ctx, next) => {
  try {
    const {
      body: { data },
      statusCode,
    } = await Users.create(ctx)
    ctx.state = {
      ...ctx.state,
      userCreated: statusCode === 201,
      jwtClaim: {
        uid: data.id,
        email: data.attributes.email,
        scope: data.attributes.role,
      },
    }
    await next()
  } catch (error) {
    ctx.throw(500, 'Call to Users service failed.', { error })
  }
}

/**
 * Takes config and claim for JWT from ctx state and generates confirmation token.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Save generated confirmation token in ctx state and pass down to the next middleware.
 */
const genConfirmToken = () => async (ctx, next) => {
  const confirmToken = generateToken(
    ctx.state.jwtClaim,
    ctx.state.config.jwtSecret,
    ctx.state.config.confirmTokenMaxAge
  )
  ctx.state = {
    ...ctx.state,
    confirmToken,
  }
  await next()
}

/**
 * Verify token and extract user data from its claim.
 * Supports refresh and confirmation tokens, depending on the request.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Save extracted user data in ctx state and pass down to the next middleware.
 */
const genClaimFromToken = () => async (ctx, next) => {
  let token
  let maxAge
  if (/refresh/.test(ctx.path)) {
    token = ctx.request.body.refresh_token
    maxAge = ctx.state.config.refreshTokenMaxAge
  }
  if (/confirm/.test(ctx.path)) {
    token = ctx.query.token
    maxAge = ctx.state.config.confirmTokenMaxAge
  }
  const user = await verifyToken(token, ctx.state.config.jwtSecret, { maxAge })
  if (user.error) ctx.throw(401, INVALID_TOKEN, { error: user.error })
  ctx.state.jwtClaim = {
    uid: user.uid,
    email: user.email,
    scope: user.scope,
  }
  await next()
}

/**
 * Generate access_token and refresh_token.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Save access_token and refresh_token in ctx state and pass down to the next middleware.
 */
const genAccessRefreshTokens = () => async (ctx, next) => {
  const accessToken = generateToken(
    ctx.state.jwtClaim,
    ctx.state.config.jwtSecret,
    ctx.state.config.accessTokenMaxAge
  )
  const refreshToken = generateToken(
    ctx.state.jwtClaim,
    ctx.state.config.jwtSecret,
    ctx.state.config.refreshTokenMaxAge
  )
  ctx.state = {
    ...ctx.state,
    accessToken,
    refreshToken,
  }
  await next()
}

/**
 * Update or insert new refresh_token (upon login confirmation).
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Pass down to the next middleware.
 */
const upsertToken = () => async (ctx, next) => {
  await Tokens.upsert(ctx)
  await next()
}

/**
 * Update refresh_token if it is valid (upon token refresh request).
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 next() function.
 *
 * @returns {Promise} Pass down to the next middleware.
 */
const updateToken = () => async (ctx, next) => {
  await Tokens.update(ctx)
  await next()
}

/**
 * Generate 200 OK response with access and refresh tokens, type and expiration time.
 * Also sets no-chache response headers as a security measure.
 *
 * @param {object} ctx - Koa2 context object.
 *
 * @returns {any} 200 OK response message with defined headers.
 */
const respondWithTokens = () => ctx => {
  ctx.set({
    'cache-control': 'no-store',
    pragma: 'no-cache',
  })
  ctx.status = 200
  ctx.body = {
    access_token: ctx.state.accessToken,
    token_type: 'Bearer',
    expires_in: ms(ctx.state.config.accessTokenMaxAge),
    refresh_token: ctx.state.refreshToken,
  }
}

/**
 * Generate 200/201 OK response with notifying about confirmation token being sent.
 * Status code 200 or 201 depending whether user was created or existed (taken from ctx).
 *
 * Generates email template with magic link and send to user's memail.
 *
 * @param {object} ctx - Koa2 context object.
 *
 * @returns {any} 200/201 OK response message.
 */
const sendMagicLink = () => async ctx => {
  const statusCode = ctx.state.userCreated ? 201 : 200
  const {
    config: { smtp: smtpConfig, projectName: fromName, email: fromEmail, webClientUrl },
    jwtClaim: { email: toEmail },
    confirmToken: token,
  } = ctx.state

  const magicLinkTpl = generateEmail['MAGIC_LINK']
  const magicLinkMsg = magicLinkTpl(fromName, fromEmail, toEmail, token, webClientUrl)

  try {
    await email(magicLinkMsg, smtpConfig)
    ctx.status = statusCode
    ctx.body = {
      status: 'OK',
      message: 'confirmation token sent',
    }
  } catch (error) {
    ctx.throw(500, 'Sending email with magic link failed.', { error })
  }
}

module.exports = {
  createUser,
  genConfirmToken,
  genClaimFromToken,
  genAccessRefreshTokens,
  upsertToken,
  updateToken,
  respondWithTokens,
  sendMagicLink,
}
