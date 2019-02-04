/**
 * @file A logger utility.
 */
const extend = require('extend')
const pick = require('just-pick')
const { logInfo, logReq, logRes } = require('./lib/log-utils')
const Timer = require('./lib/time-utils')

const timer = Timer()
const options = {
  logLevels: {
    info: ['production'],
    request: ['development'],
    response: ['development'],
  },
}

/**
 * Log request and response for the session.
 * Extends default log levels with custom config, logs timestamps of session start/end.
 *
 * @param {Object} customOptions - Custom options to configure level of logging per type of event and environment.
 */
const ReqResLogger = customOptions => async (ctx, next) => {
  extend(true, options, customOptions)
  try {
    timer.set.start()
    logReq(timer.get.start.localTime(), ctx, options)
    logInfo(ctx.request, options)
    await next()
  } finally {
    timer.set.end()
    logRes(timer.get.end.localTime(), ctx, timer.get.duration(), options)
    logInfo(ctx.response, options)
  }
}

/**
 * Logs captured error and request/response context.
 * Assumes AWS CloudWatch as a logging service, that logs console outputs.
 *
 * @param {Object} err - Error object.
 * @param {Object} ctx - Koa2 context object.
 */
const ErrorLogger = () => (err, ctx) => {
  const log = {
    error: err,
    context: pick(ctx, ['request', 'response']),
  }
  console.error(log)
}

module.exports = {
  ReqResLogger,
  ErrorLogger,
}
