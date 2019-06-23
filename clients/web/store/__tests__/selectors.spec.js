import { getIsFinished, getIsAuthenticatedUser, getIsAuthorizedUser } from '../selectors'

import initialState from '../initialState'

describe('getIsFinished()', () => {
  test(`👍 should return true if loading auth is finished`, () => {
    const state = {
      ...initialState,
      isFinished: {
        auth: true,
      },
    }
    const isAuthFinished = getIsFinished(state, 'auth')
    expect(isAuthFinished).toBeTruthy()
  })
  test(`👎 should return false if loading auth is not finished`, () => {
    const isAuthFinished = getIsFinished(initialState, 'auth')
    expect(isAuthFinished).toBeFalsy()
  })
  test(`👎 should return false if checking for not existing object`, () => {
    const isRainbowFinished = getIsFinished(initialState, 'rainbow')
    expect(isRainbowFinished).toBeFalsy()
  })
})

describe('getIsAuthenticated()', () => {
  test(`👍 should return true if is access_token is defined`, () => {
    const state = {
      ...initialState,
      auth: {
        ...initialState.auth,
        access_token: 'example_access_token',
      },
    }
    const isAuthenticated = getIsAuthenticatedUser(state)
    expect(isAuthenticated).toBeTruthy()
  })
  test(`👎 should return false if access_token is not defined`, () => {
    const isAuthenticated = getIsAuthenticatedUser(initialState)
    expect(isAuthenticated).toBeFalsy()
  })
})

describe('getIsAuthorized()', () => {
  test(`👍 should return true if is access_token is defined and scope match`, () => {
    const state = {
      ...initialState,
      auth: {
        ...initialState.auth,
        access_token: 'example_access_token',
        scope: 'admin',
      },
    }
    const isAuthorized = getIsAuthorizedUser(state, ['user', 'admin'])
    expect(isAuthorized).toBeTruthy()
  })
  test(`👎 should return false if user is not authenticated`, () => {
    const isAuthorized = getIsAuthorizedUser(initialState, ['user'])
    expect(isAuthorized).toBeFalsy()
  })
  test(`👎 should return false if user is authenticated but has not enough privilege`, () => {
    const state = {
      ...initialState,
      auth: {
        ...initialState.auth,
        access_token: 'example_access_token',
        scope: 'user',
      },
    }
    const isAuthorized = getIsAuthorizedUser(state, 'admin')
    expect(isAuthorized).toBeFalsy()
  })
})
