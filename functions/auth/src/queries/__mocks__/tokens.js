const {
  queries: { mockFindByKey },
} = require('@hypefight/test-helpers')
const mockTokensDB = require('../../../fixtures/tokens')

module.exports = {
  upsert: ctx => {
    const uid = ctx.state.jwtClaim.uid
    const refreshToken = ctx.state.refreshToken
    if (!uid || !refreshToken) ctx.fail({ info: 'token upsert failed' })
    return true
  },
  update: ctx => {
    const uid = ctx.state.jwtClaim.uid
    const refreshToken = ctx.request.body.refresh_token
    if (!uid || !refreshToken) ctx.fail({ info: 'token update failed' })
    const recordByUid = mockFindByKey(mockTokensDB, 'uid', uid)
    if (recordByUid && recordByUid.refreshToken === refreshToken) {
      return true
    }
    ctx.fail({ msg: 'AUTH_INCORRECT_REFRESH_TOKEN' })
  },
}
