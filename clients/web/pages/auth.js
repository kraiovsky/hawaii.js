import React from 'react'
import Link from 'next/link'
import { Auth as authApi } from '../api'

const Auth = () => {
  const login = async () => {
    try {
      await authApi.MagicLink.send({
        body: {
          // email: 'aaa@gmail.com',
        },
      })
      await window.alert('email sent')
    } catch (err) {
      await window.alert('error')
    }
  }
  return (
    <>
      <p>Authentication</p>
      <p>
        Email: <input type="email" />
        <button onClick={login}>Send magic link</button>
      </p>
      <Link href="/">
        <a>Home</a>
      </Link>
    </>
  )
}

export default Auth
