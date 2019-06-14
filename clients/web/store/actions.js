import Cookies from 'js-cookie'
import { Auth as authApi } from '../api'
import { decodeRefreshToken, decodeAccessToken } from '../utils/auth'
import { IS_FINISHED_TOGGLE, PAGE_TITLE_CHANGE, AUTH_SUCCESS, AUTH_RESET } from './actionTypes'

const saveAuthTokens = async (accessToken, refreshToken, dispatch) => {
  const { refreshTokenExpiresIn } = decodeRefreshToken(refreshToken)
  const { accessTokenExpiresIn, scope, uid, email } = decodeAccessToken(accessToken)
  Cookies.set('access_token', accessToken, { expires: accessTokenExpiresIn })
  Cookies.set('refresh_token', refreshToken, { expires: refreshTokenExpiresIn })
  dispatch({ type: AUTH_SUCCESS, payload: { accessToken, refreshToken, scope, uid, email } })
}

export const setOrRefreshAccessToken = async dispatch => {
  const refreshToken = Cookies.get('refresh_token')
  const accessToken = Cookies.get('access_token')
  if (refreshToken && accessToken) {
    await saveAuthTokens(accessToken, refreshToken, dispatch)
  } else if (refreshToken && !accessToken) {
    try {
      const res = await authApi.Token.refresh({ body: { refresh_token: refreshToken } })
      if (res.status() === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data()
        await saveAuthTokens(accessToken, refreshToken, dispatch)
      }
    } catch {
      await logout(dispatch)
    }
  }
  await setIsFinished('auth', true, dispatch)
}

export const sendMagicLink = async (email, dispatch) => {
  try {
    await authApi.MagicLink.send({ body: { email } })
  } catch {
    throw new Error()
  }
}

export const confirmMagicLink = async (token, dispatch) => {
  try {
    const res = await authApi.MagicLink.confirm({ token })
    if (res.status() === 200) {
      const { access_token: accessToken, refresh_token: refreshToken } = res.data()
      await saveAuthTokens(accessToken, refreshToken, dispatch)
    }
  } catch {
    throw new Error()
  }
}

export const logout = async dispatch => {
  dispatch({ type: AUTH_RESET })
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  return true
}

export const setPageTitle = (title = '', dispatch) => {
  dispatch({ type: PAGE_TITLE_CHANGE, payload: { title } })
}

export const setIsFinished = (key, value, dispatch) => {
  dispatch({ type: IS_FINISHED_TOGGLE, payload: { key, value } })
}
