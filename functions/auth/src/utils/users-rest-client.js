/**
 * @file Users REST HTTP client.
 */
const got = require('got')

/**
 * REST client initialization, using service token and users api url.
 *
 * @param {string} token - Service security token.
 * @param {string} url - Users API URL.
 *
 */
const usersClient = (token, url) =>
  got.extend({
    baseUrl: url,
    json: true,
    headers: {
      Authorization: 'Bearer ' + token,
    },
  })

/**
 * Create user helper method.
 *
 * @param {string} email - Email of user to create.
 * @param {string} serviceToken - Service security token.
 * @param {string} usersApiUrl - Users API URL.
 *
 * @returns {object} Object of newly created or found existing user, with flag whether it was created.
 */
const create = async ({ email }, { serviceToken, config: { usersApiUrl } }) => {
  const body = { email }
  const user = await usersClient(serviceToken, usersApiUrl).post('/', { body })
  return {
    data: user.body,
    created: user.statusCode === 201,
  }
}

module.exports = {
  create,
}
