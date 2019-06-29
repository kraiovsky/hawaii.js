import jwt from 'jsonwebtoken'
import Cookies from 'js-cookie'

const decodeRefreshToken = async token => {
  const { exp } = await jwt.decode(token)
  const expiresIn = new Date(exp * 1000)
  return { refreshTokenExpiresIn: expiresIn }
}

const decodeAccessToken = async token => {
  const { exp, scope, uid, email } = await jwt.decode(token)
  const expiresIn = new Date(exp * 1000)
  return {
    accessTokenExpiresIn: expiresIn,
    scope,
    uid,
    email,
  }
}

export const decodeAuthTokens = async (accessToken, refreshToken) => {
  const { refreshTokenExpiresIn } = await decodeRefreshToken(refreshToken)
  const { accessTokenExpiresIn, scope, uid, email } = await decodeAccessToken(accessToken)
  return {
    accessToken,
    refreshToken,
    scope,
    uid,
    email,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  }
}

export const getAuthCookies = async () => {
  const accessTokenCookie = Cookies.get('access_token')
  const refreshTokenCookie = Cookies.get('refresh_token')
  return { accessTokenCookie, refreshTokenCookie }
}

export const setAuthCookies = async ({
  accessToken,
  refreshToken,
  accessTokenExpiresIn,
  refreshTokenExpiresIn,
}) => {
  Cookies.set('access_token', accessToken, { expires: accessTokenExpiresIn })
  Cookies.set('refresh_token', refreshToken, { expires: refreshTokenExpiresIn })
  return true
}

export const removeAuthCookies = async () => {
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  return true
}
