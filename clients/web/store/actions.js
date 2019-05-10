import Router from 'next/router'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { Auth as authApi } from '../api'

const saveAuthTokens = (accessToken, refreshToken, dispatch) => {
  const { exp: refreshTokenExpiration } = jwt.decode(refreshToken)
  const { exp: accessTokenExpiration, scope, uid, email } = jwt.decode(accessToken)
  const refreshTokenExpiresIn = new Date(refreshTokenExpiration * 1000)
  const accessTokenExpiresIn = new Date(accessTokenExpiration * 1000)
  dispatch({ type: 'signin', payload: { accessToken, refreshToken, scope, uid, email } })
  Cookies.set('access_token', accessToken, { expires: accessTokenExpiresIn })
  Cookies.set('refresh_token', refreshToken, { expires: refreshTokenExpiresIn })
}

export const refreshAccessToken = dispatch => {
  const refreshToken = Cookies.get('refresh_token')
  if (refreshToken) {
    authApi.Token.refresh({ body: { refresh_token: refreshToken } }).then(res => {
      if (res.status() === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data()
        saveAuthTokens(accessToken, refreshToken, dispatch)
      }
    })
  }
}

export const sendMagicLink = (email, dispatch) => {
  return authApi.MagicLink.send({ body: { email } })
    .then(res => {
      if (res.status() === 200 || res.status() === 201) {
        Router.push('/auth/confirm')
      } else {
        return false
      }
    })
    .catch(res => false)
}

export const confirmMagicLink = (token, dispatch) => {
  return authApi.MagicLink.confirm({ token })
    .then(res => {
      if (res.status() === 200) {
        const { access_token: accessToken, refresh_token: refreshToken } = res.data()
        saveAuthTokens(accessToken, refreshToken, dispatch)
        Router.push('/dashboard')
      } else {
        return false
      }
    })
    .catch(() => false)
}

export const logout = dispatch => {
  dispatch({ type: 'logout' })
  Cookies.remove('access_token')
  Cookies.remove('refresh_token')
  Router.push('/')
}
