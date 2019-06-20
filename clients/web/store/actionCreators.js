import { IS_FINISHED_TOGGLE, PAGE_TITLE_CHANGE, AUTH_SUCCESS, AUTH_RESET } from './actionTypes'

export const toggleIsFinished = (key, value) => ({
  type: IS_FINISHED_TOGGLE,
  payload: { key, value },
})

export const setPageTitle = title => ({
  type: PAGE_TITLE_CHANGE,
  payload: { title },
})

export const resetAuth = {
  type: AUTH_RESET,
}

export const setAuthSuccess = ({ accessToken, refreshToken, scope, uid, email }) => ({
  type: AUTH_SUCCESS,
  payload: { accessToken, refreshToken, scope, uid, email },
})
