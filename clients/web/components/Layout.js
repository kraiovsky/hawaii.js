import React from 'react'
import Link from 'next/link'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>{' '}
        <Link prefetch href="/dashboard">
          <a>Dashboard</a>
        </Link>{' '}
        <Link prefetch href="/auth">
          <a>Login/Signup</a>
        </Link>
      </div>
      <div className="layout">{children}</div>
    </>
  )
}

export default Layout
