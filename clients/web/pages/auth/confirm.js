import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { useGlobalState, confirmMagicLink } from '../../store'
import MagicLinkInput from '../../components/MagicLinkInput'

const Auth = props => {
  const [, dispatch] = useGlobalState()
  const [status, setStatus] = useState()
  const [token, setToken] = useState(props.token)

  const handleConfirmMagicLink = async () => {
    setStatus('validating')
    const emailConfirmed = await confirmMagicLink(token, dispatch)
    if (!emailConfirmed) setStatus('error')
  }

  useEffect(() => {
    if (token) handleConfirmMagicLink()
  }, [props.token])

  let statusMsg
  if (status === 'validating') statusMsg = 'Validating magic link...'
  else if (status === 'error') statusMsg = 'Invalid or expired token, please enter token manually:'

  return (
    <>
      <h2>Confirm email</h2>
      <p>{statusMsg}</p>
      <MagicLinkInput handleChange={setToken} handleClick={handleConfirmMagicLink} />
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

Auth.getInitialProps = ({ query }) => {
  return { token: query.token }
}

export default Auth
