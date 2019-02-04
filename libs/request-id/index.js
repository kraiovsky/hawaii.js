/**
 * @file Unique request id generation utility.
 * Uses UUID V4 to generate unique IDs.
 */
const uuid = require('uuid/v4')

/**
 * Generated unique ID for a session and sets it in a response header.
 *
 * @param {Object} ctx - Koa2 context object.
 * @property {Object} ctx.state - Session state store.
 * @property {String} ctx.state.xReqIdHeader - Request ID header name. Default to 'x-request-id' if not provided.
 * @param {Function} next - Koa2 function to proceed to the next handler.
 */
module.exports = () => async (ctx, next) => {
  const requestHeaderName = ctx.state.xReqIdHeader || 'x-request-id'
  const headerFromReq = ctx.headers[requestHeaderName]
  headerFromReq ? ctx.set(requestHeaderName, headerFromReq) : ctx.set(requestHeaderName, uuid())
  await next()
}
