import React, { useEffect } from 'react'
import NavBar from './NavBar'
import { useGlobalState, refreshAccessToken } from '../store'

export default ({ children }) => {
  const [, dispatch] = useGlobalState()
  useEffect(() => {
    refreshAccessToken(dispatch)
  }, [children])
  return (
    <>
      <NavBar />
      <div>{children}</div>
    </>
  )
}
