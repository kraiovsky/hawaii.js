const serviceConfig = require('config')
const globalConfig = require('./config')[process.env.NODE_ENV]

/**
 * Service configuration utility.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets koa state with global and service-specific configs.
 */
module.exports = () => async (ctx, next) => {
  ctx.state = {
    ...ctx.state,
    config: {
      ...globalConfig,
      ...serviceConfig,
    },
  }
  await next()
}
