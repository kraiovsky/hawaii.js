import Router from 'next/router'
import Cookies from 'js-cookie'
import jwt from 'jsonwebtoken'
import { Auth as authApi } from '../api'

const saveAuthTokens = (data, dispatch) => {
  const { access_token: accessToken, refresh_token: refreshToken } = data
  const { exp: refreshTokenExpiration } = jwt.decode(refreshToken)
  const { exp: accessTokenExpiration } = jwt.decode(accessToken)
  const refreshTokenExpiresIn = new Date(refreshTokenExpiration * 1000)
  const accessTokenExpiresIn = new Date(accessTokenExpiration * 1000)

  dispatch({ type: 'signin', payload: { accessToken, refreshToken } })
  Cookies.set('access_token', accessToken, { expires: accessTokenExpiresIn })
  Cookies.set('refresh_token', refreshToken, { expires: refreshTokenExpiresIn })
}

export const authOnAppLoad = dispatch => {
  const accessToken = Cookies.get('access_token')
  const refreshToken = Cookies.get('refresh_token')

  if (accessToken && refreshToken) {
    dispatch({ type: 'signin', payload: { accessToken, refreshToken } })
  } else if (!accessToken && refreshToken) {
    authApi.Token.refresh({ body: { refresh_token: refreshToken } }).then(res => {
      if (res.status() === 200) {
        saveAuthTokens(res.data(), dispatch)
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
        saveAuthTokens(res.data(), dispatch)
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
