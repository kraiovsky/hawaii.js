/**
 * DB queries mocks.
 */
const filter = require('lodash.filter')

/**
 * Find a record in table by key.
 *
 * @param {Object} table - A DB table.
 * @param {string} key - A key to search by.
 * @param {String} value - A value of the key to search by.
 *
 * @returns {String} Returns found value for key/value pair.
 */
const mockFindByKey = (table, key, value) => filter(table, { [key]: value })[0]

/**
 * Find all records in a table by key.
 *
 * @param {Object} table - A DB table.
 * @param {string} key - A key to search by.
 * @param {String} value - A value of the key to search by.
 *
 * @returns {String} Returns found value for key/value pair.
 */
const mockFindAllByKey = (table, key, value) => filter(table, { [key]: value })

/**
 * A first element in the mock table.
 *
 * @param {Object} table - A DB table.
 *
 * @returns {String} Returns a value for the first element in table.
 */
const mockFirstRecord = table => table[0]

/**
 * Class representing mock DB query builder.
 */
class Query {
  /**
   * Create a table.
   *
   * @param {Array} table - Mock DB table to query.
   */
  constructor(table = []) {
    this._table = table
    this._getFirst = false
  }

  /**
   * Search query params.
   *
   * @param {(function|object)} predicate - Search query. Chainable.
   */
  where(predicate) {
    if (!Array.isArray(this._table)) this._table = [this.table]
    this._table = filter(this._table, predicate)
    return this
  }

  /**
   * Set a flag to return the first object of the query.
   */
  getFirst() {
    this._getFirst = true
    return this
  }

  /**
   * Get the query results.
   *
   * @returns {(Array|Object|number)} Returns result matching the query.
   */
  exec() {
    return this._getFirst ? this._table[0] : this._table
  }

  /**
   * Get the count of results matching the query.
   *
   * @returns {number} Returns count of results matching the query.
   */
  count() {
    return this._table.length
  }
}

module.exports = {
  mockFindByKey,
  mockFindAllByKey,
  mockFirstRecord,
  Query,
}
