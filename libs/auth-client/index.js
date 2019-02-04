const { generateToken, verifyToken } = require('./libs/token')

/**
 * Authentication utility.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets user object with authenticated user's details and proceeds to the next handler.
 */
const Authenticate = () => {
  return async (ctx, next) => {
    const { jwtSecret, accessTokenMaxAge } = ctx.state.config
    const jwt = ctx.headers.authorization.split(' ')[1]
    const user = await verifyToken(jwt, jwtSecret, { maxAge: accessTokenMaxAge })
    if (user.error) ctx.fail({ msg: 'UNAUTHENTICATED', info: user.error })
    ctx.state = { user }
    await next()
  }
}

/**
 * Authorization utility.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets user object with authenticated user's details and proceeds to the next handler.
 */
const Authorize = (scope = []) => {
  return async (ctx, next) => {
    const permissions = [...scope, 'admin']
    if (permissions.indexOf(ctx.state.user.scope) === -1) ctx.fail({ msg: 'UNAUTHORIZED' })
    await next()
  }
}

/**
 * Service-to-service transport authenticate utility.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets service access token and proceeds to the next handler.
 */
const SignTransportReq = () => {
  return async (ctx, next) => {
    const { serviceName, jwtSecret, serviceTokenMaxAge } = ctx.state.config
    const token = generateToken({ scope: serviceName }, jwtSecret, serviceTokenMaxAge)
    ctx.state.serviceToken = token
    await next()
  }
}

module.exports = {
  Authenticate,
  Authorize,
  SignTransportReq,
}
