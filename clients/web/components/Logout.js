import React from 'react'
import Link from 'next/link'
import { useGlobalState, logout } from '../store'

export default () => {
  const [, dispatch] = useGlobalState()
  return (
    <>
      <Link href="#">
        <a onClick={() => logout(dispatch)}>Log out</a>
      </Link>
    </>
  )
}
