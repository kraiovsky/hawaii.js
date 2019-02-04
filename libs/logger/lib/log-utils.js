/**
 * Logger utils.
 */
const chalk = require('chalk')

/**
 * Maps status codes to color for better logs visualization.
 *
 * @param {Number} status - Response status code.
 *
 * @returns {String} A color code name.
 */
const statusColor = status => {
  const colorCodes = {
    7: 'magenta',
    5: 'red',
    4: 'yellow',
    3: 'cyan',
    2: 'green',
    1: 'green',
    0: 'yellow',
  }
  const s = (status / 100) | 0
  return colorCodes.hasOwnProperty(s) ? colorCodes[s] : 0
}

/**
 * Session information logger.
 *
 * @param {Object} msg - A message to log.
 * @param {Array} logLevels - An array of environment variables to define when to do logging.
 */
const logInfo = (msg, { logLevels }) => {
  if (logLevels.info.indexOf(process.env.NODE_ENV) > -1) console.info(msg)
}

/**
 * Request logger.
 *
 * @param {String} time - A timestamp.
 * @param {String} method - An HTTP method (GET/POST/DELETE/PATCH).
 * @param {String} originalUrl - An original request url.
 * @param {Array} logLevels - An array of environment variables to define when to do logging.
 */
const logReq = (time, { method, originalUrl }, { logLevels }) => {
  if (logLevels.request.indexOf(process.env.NODE_ENV) > -1)
    console.log(
      chalk.grey.bold(`[${time}] --> `) +
        chalk.white.bold(`${method} `) +
        chalk.grey.bold(`${originalUrl} `)
    )
}

/**
 * Response logger.
 *
 * @param {String} time - A timestamp.
 * @param {String} method - An HTTP method (GET/POST/DELETE/PATCH).
 * @param {String} path - A request path.
 * @param {String} status - A response status code.
 * @param {String} duration - Duration of the session, from request to response.
 * @param {Array} logLevels - An array of environment variables to define when to do logging.
 */
const logRes = (time, { method, path, status }, duration, { logLevels }) => {
  if (logLevels.response.indexOf(process.env.NODE_ENV) > -1) {
    const color = statusColor(status)
    console.log(
      chalk.grey.bold(`[${time}] <-- `) +
        chalk.white.bold(`${method} `) +
        chalk.grey.bold(`${path} `) +
        chalk[color].bold(`${status} `) +
        chalk.grey.bold(`${duration}`)
    )
  }
}

module.exports = {
  logInfo,
  logReq,
  logRes,
}
