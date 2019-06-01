import jwt from 'jsonwebtoken'

export const decodeRefreshToken = token => {
  const { exp } = jwt.decode(token)
  const expiresIn = new Date(exp * 1000)
  return { refreshTokenExpiresIn: expiresIn }
}

export const decodeAccessToken = token => {
  const { exp, scope, uid, email } = jwt.decode(token)
  const expiresIn = new Date(exp * 1000)
  return {
    accessTokenExpiresIn: expiresIn,
    scope,
    uid,
    email,
  }
}
