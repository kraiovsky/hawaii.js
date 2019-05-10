import React, { useEffect } from 'react'
import Router from 'next/router'
import { useGlobalState, refreshAccessToken } from '../store'

export default ({ scope = '', children }) => {
  const [{ auth }, dispatch] = useGlobalState()
  let content = <></>
  useEffect(() => {
    refreshAccessToken(dispatch)
    if (!auth.isAuthenticated) Router.push('/auth')
    if (auth.isAuthenticated && auth.scope !== scope) content = 'access forbidden'
    else content = <div>{children}</div>
  }, [auth])
  return content
}
