/**
 * @file Users SQL queries.
 */
const User = require('../models/users')

/**
 * Create user with provided email.
 * Return user record, or throw 500 Internal Server Error.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {string} uid - UUID to insert as id.
 * @param {string} email - Email to insert.
 *
 * @returns {object} User object with flag whether it was created or existed.
 */
const create = async (ctx, email) => {
  try {
    const user = await User().update(email, { email }, { createRequired: true })
    return {
      data: user,
      created: Date.parse(user.createdAt) === Date.parse(user.updatedAt),
    }
  } catch (error) {
    ctx.throw(500, 'Failed to create/update a user', { error })
  }
}

/**
 * Find user by provided key-value pair.
 * Return user record, or throw 500 Internal Server Error.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {string} query - A search query (key-value pair).
 *
 * @returns {object} User object.
 */
const find = async (ctx, query) => {
  try {
    const user = await User()
      .queryOne(query)
      .exec()
    return user
  } catch (error) {
    ctx.throw(500, 'Failed to query a user', { error })
  }
}

module.exports = {
  find,
  create,
}
