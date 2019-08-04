const {
  dbQueries: { mockFindByKey },
} = require('@hypefight/test-helpers')
const mockTokensDB = require('../../../fixtures/tokens')
const { INVALID_TOKEN } = require('../../../config/errors')

module.exports = {
  upsert: ctx => {
    const uid = ctx.state.jwtClaim.uid
    const refreshToken = ctx.state.refreshToken
    if (!uid || !refreshToken) return ctx.throw(500, 'token upsert failed')
    return true
  },
  update: ctx => {
    const uid = ctx.state.jwtClaim.uid
    const refreshToken = ctx.request.body.refresh_token
    if (!uid || !refreshToken) return ctx.throw(500, 'token upsert failed')
    const recordByUid = mockFindByKey(mockTokensDB, 'uid', uid)
    if (recordByUid && recordByUid.refreshToken === refreshToken) {
      return true
    }
    return ctx.throw(401, INVALID_TOKEN)
  },
}
