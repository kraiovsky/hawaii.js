/**
 * @file Users REST HTTP client.
 */
const restClient = require('@hypefight/s2s-rest-client')

/**
 * Create user helper method.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {string} ctx.request.body.email - Received email to create or update record for.
 *
 * @returns {object} Object of newly created or found existing user, with flag whether it was created.
 */
const create = async ctx => {
  const {
    request: {
      body: { email },
    },
  } = ctx
  const body = { email }
  const usersAPI = restClient('usersApiUrl')(ctx)
  return await usersAPI.post('/v1/users', { body })
}

module.exports = {
  create,
}
