/**
 * @file Auth Tokens SQL queries.
 */
const Token = require('../models/tokens')
const { INVALID_TOKEN } = require('../../config/errors')

/**
 * Update or insert new refresh token for a given user.
 * This is used ie when user logs in and we have to generate new token.
 * Return modified record, or throw 500 Internal Server Error.
 *
 * @param {object} ctx - Koa2 context object.
 *
 * @returns {object} Inserted or updated token record.
 */
const upsert = async ctx => {
  try {
    await Token().update({
      uid: ctx.state.jwtClaim.uid,
      refreshToken: ctx.state.refreshToken,
    })
    return true
  } catch (error) {
    ctx.throw(500, 'Refresh token upsert operation failed', { error })
  }
}

/**
 * Update refresh token for a given user.
 * Does hard match of old refresh token, if it fails - user will need to authenticate again.
 * Return whether update succeeded, or throw 500 Internal Server Error.
 *
 * @param {object} ctx - Koa2 context object.
 * @param {object} authError - An authentication error object.
 *
 * @returns {boolean} Record has been updated.
 */
const update = async ctx => {
  try {
    await Token().update(
      { uid: ctx.state.jwtClaim.uid },
      { refreshToken: ctx.state.refreshToken },
      {
        condition: '#refreshToken = :refreshToken',
        conditionNames: { refreshToken: 'refreshToken' },
        conditionValues: { refreshToken: ctx.request.body.refresh_token },
      }
    )
    return true
  } catch (error) {
    if (error.code === 'ConditionalCheckFailedException') {
      ctx.throw(401, INVALID_TOKEN, { error })
    }
    ctx.throw(500, 'Refresh token update operation failed', { error })
  }
}

module.exports = {
  upsert,
  update,
}
