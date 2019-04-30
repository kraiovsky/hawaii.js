import React from 'react'
import { useGlobalState } from '../store'

export const withLoginRequired = Component => {
  const WithLoginRequired = props => {
    const [{ auth }] = useGlobalState()
    return <Component {...props} isAuthenticated={auth.isAuthenticated} />
  }

  WithLoginRequired.getInitialProps = async ctx => {
    return {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    }
  }

  return WithLoginRequired
}
