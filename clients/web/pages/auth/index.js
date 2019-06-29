import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import { Auth as authApi } from '../../api'
import { getIsAuthenticatedUser } from '../../store/selectors'
import { setPageTitle } from '../../store/actionCreators'
import AuthForm from '../../components/AuthForm'

const pageTitle = 'Signup or Login'

const Auth = () => {
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
  })

  const handleSendEmail = async ({ email }) => {
    await setError(false)
    await setInProgress(true)
    try {
      const res = await authApi.MagicLink.send({ body: { email } })
      const status = res.status()
      if (status === 200 || status === 201) {
        Router.push('/auth/confirm')
      } else {
        await setError(true)
      }
    } catch {
      await setError(true)
    }
    await setInProgress(false)
  }

  const errorMsg = 'Failed to send magic link, please try again.'
  const inProgressMsg = 'Sending magic link...'

  return (
    <>
      <h2>Authentication</h2>
      <p>{error && errorMsg}</p>
      <p>{inProgress && inProgressMsg}</p>
      <AuthForm onSubmit={handleSendEmail} />
    </>
  )
}

export default Auth
