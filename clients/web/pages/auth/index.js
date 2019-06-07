import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, sendMagicLink, getIsAuthenticatedUser, setPageTitle } from '../../store'
import AuthForm from '../../components/AuthForm'

const pageTitle = 'Signup or Login'

const Auth = () => {
  const [state, dispatch] = useGlobalState()
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPageTitle(pageTitle, dispatch)
    if (getIsAuthenticatedUser(state)) {
      Router.push('/')
    }
  }, [])

  const handleSendEmail = async ({ email }) => {
    setError(false)
    setInProgress(true)
    try {
      await sendMagicLink(email, dispatch)
      Router.push('/auth/confirm')
    } catch {
      setInProgress(false)
      setError(true)
    }
  }

  const errorMsg = 'Failed to send magic link, please try again.'
  const inProgressMsg = 'Sending magic link...'

  return (
    <>
      <h2>Authentication</h2>
      <p>{error && errorMsg}</p>
      <p>{inProgress && inProgressMsg}</p>
      <AuthForm onSubmit={handleSendEmail} />
      <p>
        Received confirmation token? Validate it{' '}
        <Link href="/auth/confirm">
          <a>here</a>
        </Link>
        .
      </p>
    </>
  )
}

export default Auth
