/**
 * @file Custom error throw method.
 */

/**
 * Creates and throws new error.
 *
 * @param {Object} errorDetails - An error that's been thrown, may contain error code, message and additional info.
 *
 * @throws {Error} Throws an error.
 */
module.exports = () => errorDetails => {
  const error = new Error()
  error.code = errorDetails.code || 500
  error.message = errorDetails.msg || 'Internal Server Error'
  error.info = errorDetails.info || ''
  throw error
}
