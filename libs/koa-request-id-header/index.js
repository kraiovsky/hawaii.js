/**
 * @file Unique request id generation utility.
 * Uses UUID V4 to generate unique IDs.
 */
const uuid = require('uuid/v4')

/**
 * Generated unique ID for a session and sets it in a response header.
 *
 * @param {Object} ctx - Koa2 context object.
 * @param {Function} next - Koa2 function to proceed to the next handler.
 */
module.exports = (requestIdHeader = 'x-request-id') => async (ctx, next) => {
  const receivedRequestId = ctx.get(requestIdHeader)
  receivedRequestId ? ctx.set(requestIdHeader, receivedRequestId) : ctx.set(requestIdHeader, uuid())
  await next()
}
