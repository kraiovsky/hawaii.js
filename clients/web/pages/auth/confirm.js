import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'
import { Auth as authApi } from '../../api'
import { getIsAuthenticatedUser } from '../../store/selectors'
import { setPageTitle, toggleIsFinished, setAuthSuccess } from '../../store/actionCreators'
import { decodeAuthTokens, setAuthCookies } from '../../utils/auth'

const pageTitle = 'Confirm your login'

const Confirm = ({ token }) => {
  const state = useSelector(state => state)
  const dispatch = useDispatch()
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(false)
  const isAuthenticatedUser = getIsAuthenticatedUser(state)

  useEffect(() => {
    dispatch(setPageTitle(pageTitle))
    if (isAuthenticatedUser) {
      Router.push('/')
    }
  }, [dispatch, isAuthenticatedUser])

  useEffect(() => {
    const handleConfirmToken = async token => {
      await setError(false)
      await setInProgress(true)
      try {
        const res = await authApi.MagicLink.confirm({ token })
        if (res.status() === 200) {
          const { access_token: accessToken, refresh_token: refreshToken } = res.data()
          const authTokensPayload = await decodeAuthTokens(accessToken, refreshToken)
          await setAuthCookies(authTokensPayload)
          dispatch(setAuthSuccess(authTokensPayload))
          dispatch(toggleIsFinished('auth', true))
          Router.push('/dashboard')
        } else {
          await setError(true)
        }
      } catch {
        await setError(true)
      }
      await setInProgress(false)
    }
    if (token) handleConfirmToken(token)
  }, [dispatch, token])

  const inProgressMsg = 'Validating magic link...'
  const errorMsg = 'Failed to validate confirmation token.'

  return (
    <>
      <h2>Check your email</h2>
      <p>{inProgress && inProgressMsg}</p>
      <p>{error && errorMsg}</p>
      <p>
        Did not receive confirmation email?{' '}
        <Link href="/auth">
          <a>Send email again</a>
        </Link>{' '}
        or check your spam folder.
      </p>
    </>
  )
}

Confirm.getInitialProps = ({ query }) => {
  return { token: query.token }
}

export default Confirm
