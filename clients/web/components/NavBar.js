import React from 'react'
import Link from 'next/link'
import { useGlobalState, getIsFinished, getIsAuthenticatedUser } from '../store'
import LoginSignup from './AuthNav'
import Logout from './Logout'

export default () => {
  const [state] = useGlobalState()

  return (
    <>
      <div>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
        {' | '}
        <Link href="/dashboard">
          <a>Dashboard</a>
        </Link>
        {getIsFinished(state, 'auth') && !getIsAuthenticatedUser(state) && (
          <>
            {' | '}
            <LoginSignup />
          </>
        )}
        {getIsFinished(state, 'auth') && getIsAuthenticatedUser(state) && (
          <>
            {' | '}
            <Logout />
          </>
        )}
      </div>
    </>
  )
}
