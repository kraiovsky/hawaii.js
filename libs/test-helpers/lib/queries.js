/**
 * DB queries mocks.
 */
const find = require('lodash.find')

/**
 * A find value by key mock.
 *
 * @param {Object} table - A DB table.
 * @param {string} key - A key to search by.
 * @param {String} value - A value of the key to search by.
 *
 * @returns {String} Returns found value for key/value pair.
 */
const mockFindByKey = (table, key, value) => find(table, index => index[key] === value)

/**
 * A first element in the mock table.
 *
 * @param {Object} table - A DB table.
 *
 * @returns {String} Returns a value for the first element in table.
 */
const mockFirstRecord = table => table[0]

module.exports = {
  mockFindByKey,
  mockFirstRecord,
}
