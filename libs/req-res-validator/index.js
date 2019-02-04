/**
 * @file Request and response validator.
 */
const generateErrorBody = require('@hypefight/error-handler/lib/body-generator')
const { status, title } = generateErrorBody('BAD_REQUEST')

/**
 * Catch request/response validation error, which is dispatched by joi-router middleware, and throw a Bad Request error.
 *
 * @param {Object} ctx - Koa2 context object.
 * @property {Object} ctx.invalid.query - An object dispatched by joi-router with validation error details.
 * @property {String} ctx.invalid.query.message - joi-router validation error message.
 * @property {Object} ctx.invalid.query.stack - joi-router validation error stack.
 * @param {Function} next - Koa2 function to proceed to the next handler.
 * @param {Number} status - Response status code.
 * @param {String} title - Response title.
 *
 * @throws {Error} Throws Bad Request error with req/res validation error details.
 */
module.exports = () => async (ctx, next) => {
  if (ctx.invalid)
    ctx.throw(status, title, {
      validation: { message: ctx.invalid.query.message, stack: ctx.invalid.query.stack },
    })
  await next()
}
