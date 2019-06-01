import Cookies from 'js-cookie'
import { Auth as authApi } from '../api'
import { decodeRefreshToken, decodeAccessToken } from '../utils/auth'

const saveAuthTokens = (accessToken, refreshToken, dispatch) => {
  const { refreshTokenExpiresIn } = decodeRefreshToken(refreshToken)
  const { accessTokenExpiresIn, scope, uid, email } = decodeAccessToken(accessToken)
  Cookies.set('access_token', accessToken, { expires: accessTokenExpiresIn })
  Cookies.set('refresh_token', refreshToken, { expires: refreshTokenExpiresIn })
  dispatch({ type: 'AUTH_SUCCESS', payload: { accessToken, refreshToken, scope, uid, email } })
}

export const refreshAccessToken = async dispatch => {
  const refreshToken = Cookies.get('refresh_token')
  if (refreshToken) {
    return await authApi.Token.refresh({ body: { refresh_token: refreshToken } })
      .then(res => {
        if (res.status() === 200) {
          const { access_token: accessToken, refresh_token: refreshToken } = res.data()
          saveAuthTokens(accessToken, refreshToken, dispatch)
          return true
        } else {
          return false
        }
      })
      .catch(() => false)
  }
  logout(dispatch)
}

export const sendMagicLink = async (email, dispatch) => {
  return await authApi.MagicLink.send({ body: { email } })
    .then(res => {
      const status = res.status()
      return status === 200 || status === 201
    })
    .catch(() => false)
}

export const confirmMagicLink = async (token, dispatch) => {
  return await authApi.MagicLink.confirm({ token })
    .then(res => {
      if (res.status() === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data()
        saveAuthTokens(accessToken, refreshToken, dispatch)
        return true
      } else {
        return false
      }
    })
    .catch(() => false)
}

export const logout = dispatch => {
  dispatch({ type: 'AUTH_RESET' })
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  return true
}

export const setPageTitle = (title = '', dispatch) => {
  dispatch({ type: 'PAGE_TITLE_CHANGE', payload: { title } })
}
