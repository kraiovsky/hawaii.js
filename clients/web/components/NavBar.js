import React from 'react'
import Link from 'next/link'
import { useGlobalState, getIsFinished, getIsAuthenticatedUser } from '../store'
import LoginSignup from './LoginSignup'
import Logout from './Logout'

const NavBar = () => {
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

export default NavBar
