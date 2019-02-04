/**
 * @file error handler middleware
 */
const generateErrorBody = require('./lib/body-generator')
const failHandler = require('./lib/fail-handler')

/**
 * Catch error, create error message, generate error response and emit error further downstream.
 * Adds custom error throw method to Koa context - ctx.fail().
 *
 * @param {object} errors - An object of other, service-specific errors to add to default ones.
 */
module.exports = (errors = {}) => async (ctx, next) => {
  ctx.fail = failHandler()
  try {
    await next()
  } catch (err) {
    const error = await generateErrorBody(err.message, errors)
    ctx.send(error.status, {
      errors: [error],
    })
    ctx.app.emit('error', err, ctx)
  }
}
