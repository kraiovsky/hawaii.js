/**
 * @file Error body generator utility.
 */

/**
 * Generate errors collection.
 *
 * @param {Object} errors - A custom, service-specific errors to add to default ones.
 */
const errorBodyGen = (errors = {}) => ({
  ...errors,
  BAD_REQUEST: () => ({
    status: 400,
    title: 'BAD_REQUEST',
    detail: 'Bad Request.',
  }),
  UNAUTHENTICATED: () => ({
    status: 401,
    title: 'UNAUTHENTICATED',
    detail: '401 Unauthorized',
  }),
  UNAUTHORIZED: () => ({
    status: 403,
    title: 'UNAUTHORIZED',
    detail: '403 Forbidden',
  }),
  _default: () => ({
    status: 500,
    title: 'INTERNAL_SERVER_ERROR',
    detail: 'Internal Server Error.',
  }),
})

/**
 * Generates error object for a received error, or fallback to default one.
 *
 * @param {String} error - An error thrown by a service.
 * @param {Object} errors - An errors collection.
 *
 * @returns {Object} Returns an error body object.
 */
module.exports = (error, errors = {}) => {
  const errorBody = errorBodyGen(errors)
  return errorBody[error] ? errorBody[error]() : errorBody._default()
}
