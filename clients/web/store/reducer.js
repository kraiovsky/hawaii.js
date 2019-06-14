import initialState from './state'
import { IS_FINISHED_TOGGLE, PAGE_TITLE_CHANGE, AUTH_SUCCESS, AUTH_RESET } from './actionTypes'

export default (state = initialState, action) => {
  switch (action.type) {
    case IS_FINISHED_TOGGLE:
      const { key, value } = action.payload
      return {
        ...state,
        isFinished: {
          ...state.isFinished,
          [key]: value,
        },
      }
    case AUTH_SUCCESS:
      return {
        ...state,
        auth: {
          ...state.auth,
          access_token: action.payload.accessToken,
          refresh_token: action.payload.refreshToken,
          scope: action.payload.scope,
          uid: action.payload.uid,
          email: action.payload.email,
        },
      }
    case AUTH_RESET:
      return {
        ...state,
        auth: initialState.auth,
      }
    case PAGE_TITLE_CHANGE:
      return {
        ...state,
        pageTitle: action.payload.title,
      }
    default:
      return state
  }
}
