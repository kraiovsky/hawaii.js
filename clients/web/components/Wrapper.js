import React from 'react'
import { withAuth } from '../hocs'
import NavBar from './NavBar'

const Wrapper = ({ isAuthenticated, children }) => {
  return (
    <>
      <NavBar isAuthenticated={isAuthenticated} />
      <div>{children}</div>
    </>
  )
}

export default withAuth(Wrapper)
