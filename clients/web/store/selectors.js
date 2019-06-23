const isEmpty = require('just-is-empty')

export const getIsFinished = (state, key) => state.isFinished[key]

export const getIsAuthenticatedUser = state => !isEmpty(state.auth.access_token)

export const getIsAuthorizedUser = (state, pageScope) =>
  getIsAuthenticatedUser(state) && pageScope.includes(state.auth.scope)
