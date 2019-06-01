import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useGlobalState, logout } from '../store'

export default () => {
  const [, dispatch] = useGlobalState()

  const handleLogoutClick = async () => {
    if (await logout(dispatch)) {
      Router.push('/')
    }
  }
  return (
    <>
      <Link href="#">
        <a onClick={handleLogoutClick}>Log out</a>
      </Link>
    </>
  )
}
