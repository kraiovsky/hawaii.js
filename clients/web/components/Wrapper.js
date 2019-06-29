import React, { useEffect } from 'react'
import Head from 'next/head'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import { Auth as authApi } from '../api'
import { getIsAuthenticatedUser } from '../store/selectors'
import { toggleIsFinished, setAuthSuccess } from '../store/actionCreators'
import { getAuthCookies, setAuthCookies, removeAuthCookies, decodeAuthTokens } from '../utils/auth'
import { PROJECT_NAME } from '../constants'

const Wrapper = ({ children }) => {
  const state = useSelector(state => state)
  const { pageTitle } = state
  const dispatch = useDispatch()
  const isAuthenticatedUser = getIsAuthenticatedUser(state)

  useEffect(() => {
    const setOrRefreshAuthTokens = async () => {
      const { accessTokenCookie, refreshTokenCookie } = await getAuthCookies()
      let authTokensPayload

      if (accessTokenCookie && refreshTokenCookie && !isAuthenticatedUser) {
        authTokensPayload = await decodeAuthTokens(accessTokenCookie, refreshTokenCookie)
      } else if (!accessTokenCookie && refreshTokenCookie) {
        try {
          const res = await authApi.Token.refresh({ body: { refresh_token: refreshTokenCookie } })
          if (res.status() === 200) {
            const { access_token: accessToken, refresh_token: refreshToken } = res.data()
            authTokensPayload = await decodeAuthTokens(accessToken, refreshToken)
          }
        } catch (e) {
          /**
           * if token is unauthorized, i.e. expired or invalid,
           * we do not want to keep refreshing and hitting server uselessly,
           * so let's clean it up.
           */
          if (e.status() === 401) {
            await removeAuthCookies()
          }
        }
      }

      if (authTokensPayload) {
        await setAuthCookies(authTokensPayload)
        dispatch(setAuthSuccess(authTokensPayload))
      }
      dispatch(toggleIsFinished('auth', true))
    }

    setOrRefreshAuthTokens()
  }, [children, dispatch, isAuthenticatedUser])

  return (
    <>
      <Head>
        <title>
          {PROJECT_NAME} - {pageTitle}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  )
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Wrapper
