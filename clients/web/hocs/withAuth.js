import React, { useEffect } from 'react'
import { useGlobalState, authOnAppLoad } from '../store'

export const withAuth = Component => {
  const WithAuth = props => {
    const [{ auth }, dispatch] = useGlobalState()

    useEffect(() => {
      authOnAppLoad(dispatch)
    })

    return <Component {...props} isAuthenticated={auth.isAuthenticated} />
  }

  WithAuth.getInitialProps = async ctx => {
    return {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    }
  }

  return WithAuth
}
