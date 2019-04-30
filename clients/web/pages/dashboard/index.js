import React from 'react'
import { useGlobalState } from '../../store'
import redirect from '../../utils/redirect'

const Dashboard = ctx => {
  const [
    {
      auth: { isAuthenticated },
    },
  ] = useGlobalState()
  console.log(ctx)
  return !isAuthenticated ? (
    // redirect(ctx, '/')
    <></>
  ) : (
    <>
      <h2>Dashboard</h2>
    </>
  )
}

Dashboard.getInitialProps = ctx => {
  return ctx
}

export default Dashboard
