const isEmpty = require('just-is-empty')

export const getIsFinished = (state, object) => state[object].isFinished

export const getIsError = (state, object) => state[object].isError

export const getIsAuthenticatedUser = state => !isEmpty(state.auth.access_token)

export const getIsAuthorizedUser = (state, pageScope) =>
  getIsAuthenticatedUser(state) && pageScope.includes(state.auth.scope)
