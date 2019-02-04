/**
 * Authentication utility.
 */
const jwt = require('jsonwebtoken')

/**
 * Takes payload and generates token with given secret and expiration date.
 *
 * @param {object} payload - Data we want to store in JWT.
 * @param {object} secret - Data we want to store in JWT.
 * @param {object} maxAge - Data we want to store in JWT.
 *
 * @returns {string} JWT.
 */
const generateToken = (payload, secret, maxAge) => jwt.sign(payload, secret, { expiresIn: maxAge })

/**
 * Takes Bearer token from auth header and verifies it.
 *
 * @param {object} token - JWT.
 * @param {object} secret - JWT auth secret key.
 * @param {object} options - JWT auth options.
 *
 * @returns {boolean} Is token valid or not.
 */
const verifyToken = (token, secret, options) => {
  try {
    return jwt.verify(token, secret, options)
  } catch (error) {
    return {
      error: {
        name: error.name,
        message: error.message,
      },
    }
  }
}

module.exports = {
  generateToken,
  verifyToken,
}
