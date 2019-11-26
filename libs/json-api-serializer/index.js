/**
 * @file JSON API Serializer utility.
 */
const JSONAPISerializer = require('json-api-serializer')
const serializer = new JSONAPISerializer()

/**
 * Takes name of the object and registers it as a relationship.
 *
 * @param {string} name - Name of the relationship object.
 */
const registerRelationship = name => serializer.register(name)

/**
 * Takes resource type, resource data and boilerplate for object schema and generates resource according to JSON API.
 *
 * @param {string} resource - Resource type.
 * @param {object} object - Resource type object generated for given entity.
 * @param {object} data - Resource data to serialize.
 * @param {object} meta - Meta data.
 *
 * @returns {object} Serialized resource object.
 */
const Serializer = (resource, object, data, meta = {}) => {
  serializer.register(resource, object)
  return JSON.stringify(serializer.serialize(resource, data, meta))
}

module.exports = {
  registerRelationship,
  Serializer,
}
