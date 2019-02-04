/**
 * @file API schema boilerplate generator.
 */
const serializeQueryFields = require('./lib/query-fields-serializer')

/**
 * Takes object attributes and generates boilerplate according to API schema.
 *
 * @param {string} whitelistFields - List of fields, client whitelisted for response.
 * @param {array} blacklist - List of fields, predefined for blacklist.
 * @param {object} links - Links to return.
 * @param {object} topLevelLinks - Top level links, ie pagination, index etc.
 * @param {object} relationships - Association with other entitites.
 *
 * @returns {object} API schema for given object.
 */
module.exports = (
  whitelistFields = '',
  blacklist = [],
  links = {},
  topLevelLinks = {},
  relationships = {}
) => {
  const whitelist = serializeQueryFields(whitelistFields)
  return {
    id: 'id',
    whitelist: whitelist,
    blacklist: blacklist,
    links: links,
    relationships: relationships,
    topLevelMeta: meta => meta,
    topLevelLinks: topLevelLinks,
  }
}
