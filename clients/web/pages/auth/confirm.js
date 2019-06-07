import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, confirmMagicLink, getIsAuthenticatedUser, setPageTitle } from '../../store'
import ConfirmAuthTokenForm from '../../components/ConfirmAuthTokenForm'

const pageTitle = 'Confirm your login'

const Confirm = props => {
  const [state, dispatch] = useGlobalState()
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(false)

  const handleConfirmToken = async ({ token }) => {
    setError(false)
    setInProgress(true)
    try {
      await confirmMagicLink(token, dispatch)
      Router.push('/dashboard')
    } catch {
      setInProgress(false)
      setError(true)
    }
  }

  useEffect(() => {
    setPageTitle(pageTitle, dispatch)
    if (getIsAuthenticatedUser(state)) {
      Router.push('/')
    }
    if (props.token) handleConfirmToken(props)
  }, [])

  const inProgressMsg = 'Validating magic link...'
  const errorMsg = 'Invalid or expired token.'

  return (
    <>
      <h2>Confirm your email</h2>
      <p>
        We have sent you an email. Click on the confirmation link, or paste a confirmation token
        below.
      </p>
      <p>{error && errorMsg}</p>
      <p>{inProgress && inProgressMsg}</p>
      <ConfirmAuthTokenForm onSubmit={handleConfirmToken} />
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
