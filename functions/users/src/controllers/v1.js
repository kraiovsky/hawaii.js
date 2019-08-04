/**
 * @file Users controller.
 */
const { Serializer } = require('@hypefight/json-api-serializer')
const Users = require('../queries/users')
const userSchema = require('../schemas/generators')
const { USER_NOT_FOUND } = require('../../config/errors')

/**
 * Create user with provided profile data.
 * In a passwordless-only supported auth strategy, only email is used as a profile data.
 *
 * @param {object} ctx - Koa2 context object.
 *
 * @returns {function} Responds with 200/201 OK and created/found user object.
 */
const createUser = () => async ctx => {
  const { email } = ctx.request.body
  const { data, created } = await Users.create(ctx, email)
  const user = await Serializer('user', userSchema(''), data)
  ctx.status = created ? 201 : 200
  ctx.body = user
}

/**
 * Find user by provided key.
 * If no search key provided in request params, fallback to ID as a default.
 * Serializes found user object with helper function.
 * Throws 400 User Not Found.
 *
 * @param {object} ctx - Koa2 context object.
 *
 * @returns {function} Responds with 200 OK and found user object.
 */
const findUser = () => async ctx => {
  const searchKey = ctx.query.searchKey || 'id'
  const searchQuery = { [searchKey]: ctx.params.searchQuery }
  const user = await Users.find(ctx, searchQuery)
  if (!user) ctx.throw(404, USER_NOT_FOUND)
  const serializedUser = await Serializer('user', userSchema(ctx.query['fields[users]']), user)
  ctx.status = 200
  ctx.body = serializedUser
}

module.exports = {
  createUser,
  findUser,
}
