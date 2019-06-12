import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { logout } from '../store'

export default () => {
  const dispatch = useDispatch()

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
