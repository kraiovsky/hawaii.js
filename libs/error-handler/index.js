/**
 * @file error handler middleware
 */
const Boom = require('boom')

/**
 * Catch error, log it, create error response and send it.
 * Uses `ctx.log.error` method provided by pino package.
 *
 */
module.exports = () => async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.log.error({ error: err })
    const {
      status,
      output: { payload },
    } = Boom.boomify(err, {
      statusCode: err.status,
    })
    ctx.status = status
    ctx.body = payload
  }
}
