import React from 'react'
import Link from 'next/link'

export default () => {
  return (
    <>
      <Link href="/auth">
        <a>Login</a>
      </Link>
      {' | '}
      <Link href="/auth">
        <a>Signup</a>
      </Link>
    </>
  )
}
