const globalConfig = require('./config')()

/**
 * Service configuration utility.
 *
 * @param {object} serviceConfig - Service-defined config.
 * @param {object} ctx - Koa2 context object.
 * @param {function} next - Koa2 function to proceed to the next handler.
 *
 * @returns {object} Sets koa state with global and service-specific configs.
 */
module.exports = serviceConfig => async (ctx, next) => {
  ctx.state = {
    ...ctx.state,
    config: {
      ...globalConfig,
      ...serviceConfig,
    },
  }
  await next()
}
