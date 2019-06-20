import React from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { removeAuthCookies } from '../utils/auth'
import { resetAuth } from '../store/actionCreators'

export default () => {
  const dispatch = useDispatch()

  const handleLogoutClick = async () => {
    await removeAuthCookies()
    await dispatch(resetAuth)
    Router.push('/')
  }
  return (
    <>
      <Link href="#">
        <a onClick={handleLogoutClick}>Log out</a>
      </Link>
    </>
  )
}
