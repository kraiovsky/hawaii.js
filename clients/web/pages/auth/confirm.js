import React, { useEffect, useState } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, confirmMagicLink, getIsAuthenticatedUser } from '../../store'
import MagicLinkInput from '../../components/MagicLinkInput'

const Confirm = props => {
  const [state, dispatch] = useGlobalState()
  const [token, setToken] = useState(props.token)
  const [inProgress, setInProgress] = useState(false)
  const [error, setError] = useState(false)

  const handleConfirmMagicLink = async () => {
    setError(false)
    setInProgress(true)
    if (await confirmMagicLink(token, dispatch)) {
      Router.push('/dashboard')
    } else {
      setInProgress(false)
      setError(true)
    }
  }

  useEffect(() => {
    if (getIsAuthenticatedUser(state)) {
      Router.push('/')
    }
    if (token) handleConfirmMagicLink()
  }, [props.token, state.auth])

  const inProgressMsg = 'Validating magic link...'
  const errorMsg = 'Invalid or expired token.'

  return (
    <>
      <h2>Finish your login</h2>
      <p>
        <b>Click on the confirmation link or enter the token you have received below:</b>
      </p>
      <MagicLinkInput handleChange={setToken} handleClick={handleConfirmMagicLink} />
      <p>{error && errorMsg}</p>
      <p>{inProgress && inProgressMsg}</p>
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
