/**
 * Fields serializer utility.
 *
 * @param {string} fields - String of fields to serialize.
 *
 * @returns {array} Array of serialized fields, or empty array if nothing provided.
 */
module.exports = fields => {
  return fields ? fields.split(',').filter(e => e) : []
}
