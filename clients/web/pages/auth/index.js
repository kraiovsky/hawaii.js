import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, sendMagicLink, getIsAuthenticatedUser, setPageTitle } from '../../store'

const pageTitle = 'Signup or Login'

const Auth = () => {
  const [state, dispatch] = useGlobalState()
  const [email, setEmail] = useState('')
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    setPageTitle(pageTitle, dispatch)
    if (getIsAuthenticatedUser(state)) {
      Router.push('/')
    }
  }, [])

  const handleSendClick = async () => {
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
      <p>
        Email: <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleSendClick}>Send magic link</button>
      </p>
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
