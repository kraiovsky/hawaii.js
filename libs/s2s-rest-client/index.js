/**
 * @file Service-to-service communication REST client.
 * Establishes secure connection between services using basic auth;
 * Passes request ID in the header.
 */
const got = require('got')

/**
 * REST client initialization, using service token and users api url.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {string} serviceUrlConfigKey - Key of the env variable that has base URL for the target service.
 *
 */
module.exports = serviceUrlConfigKey => async ctx => {
  const {
    state: {
      serviceToken,
      config: { [serviceUrlConfigKey]: prefixUrl, requestIdHeader },
    },
  } = ctx
  const requestId = ctx.response.get(requestIdHeader)
  return got.extend({
    prefixUrl,
    responseType: 'json',
    headers: {
      Authorization: 'Bearer ' + serviceToken,
      [requestIdHeader]: requestId,
    },
  })
}
