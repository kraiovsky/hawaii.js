import React from 'react'
import Link from 'next/link'
import { useGlobalState } from '../store'
import LoginSignup from './LoginSignup'
import Logout from './Logout'

const NavBar = () => {
  const [{ auth }] = useGlobalState()

  return (
    <>
      <div>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
        {auth.isAuthenticated && (
          <>
            {' | '}
            <Link href="/dashboard">
              <a>Dashboard</a>
            </Link>
            {' | '}
            <Logout />
          </>
        )}
        {auth && !auth.isAuthenticated && (
          <>
            {' | '}
            <LoginSignup />
          </>
        )}
      </div>
    </>
  )
}

export default NavBar
