/**
 * Set response status code to 200 OK for Next.js served pages.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets server response code to 200 OK.
 */
module.exports = () => async (ctx, next) => {
  ctx.res.statusCode = 200
  await next()
}
