/**
 * @file Users API schema generator
 */
const schema = require('@hypefight/json-api-schema-generator')

/**
 * Takes whitelisted fields and generates api schema for user.
 *
 * @param {string} whitelistedFields - List of fields, client whitelisted for response.
 *
 * @returns {object} User API schema boilerplate.
 */
module.exports = whitelistedFields => {
  const blacklistedFields = ['createdAt', 'deletedAt', 'updatedAt']
  const links = {
    self: data => `/users/${data.id}`,
  }
  const topLevelLinks = {
    index: '/users',
  }
  const relationships = {}
  return schema(whitelistedFields, blacklistedFields, links, topLevelLinks, relationships)
}
