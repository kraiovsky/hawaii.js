export default (state, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return {
        ...state,
        auth: {
          ...state.auth,
          isFinished: true,
          isError: false,
          access_token: action.payload.accessToken,
          refresh_token: action.payload.refreshToken,
          scope: action.payload.scope,
          uid: action.payload.uid,
          email: action.payload.email,
        },
      }
    case 'AUTH_RESET':
      return {
        ...state,
        auth: {
          isFinished: true,
          isError: false,
          access_token: null,
          refresh_token: null,
          scope: null,
        },
      }
    default:
      return state
  }
}
