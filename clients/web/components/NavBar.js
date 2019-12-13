import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import { getIsFinished, getIsAuthenticatedUser } from '../store/selectors'
import LoginSignup from './AuthNav'
import Logout from './Logout'

export default () => {
  const state = useSelector(state => state)

  return (
    <>
      <div>
        <Link href="/">
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
