/**
 * @file Unique request id generation utility.
 * Uses UUID V4 to generate unique IDs.
 */
const requestId = require('koa-req-id')

/**
 * Generated unique ID for a session and sets it in a response header.
 *
 * @param {Object} ctx - Koa2 context object.
 * @param {Function} next - Koa2 function to proceed to the next handler.
 */
module.exports = () => async (ctx, next) => {
  await requestId(ctx.state.config.requestIdHeader)(ctx, next)
}
