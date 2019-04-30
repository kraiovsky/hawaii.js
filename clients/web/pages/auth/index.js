import React, { useState, useEffect } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, sendMagicLink } from '../../store'

const Auth = () => {
  const [
    {
      auth: { isAuthenticated },
    },
    dispatch,
  ] = useGlobalState()
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState()

  useEffect(() => {
    if (isAuthenticated) Router.push('/')
  })

  const handleSendClick = async () => {
    const emailSent = await sendMagicLink(email, dispatch)
    if (!emailSent) setStatus('error')
  }

  let errorMsg
  if (status === 'error') errorMsg = 'Failed to send magic link, please try again.'
  return (
    <>
      <h2>Authentication</h2>
      <p>{errorMsg}</p>
      <p>
        Email: <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
        <button onClick={handleSendClick}>Send magic link</button>
      </p>
      <p>
        Received confirmation token? Confirm your email manually{' '}
        <Link href="/auth/confirm">
          <a>here</a>
        </Link>
        .
      </p>
    </>
  )
}

export default Auth
