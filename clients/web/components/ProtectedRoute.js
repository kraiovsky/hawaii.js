import React from 'react'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { getIsAuthorizedUser, getIsFinished } from '../store'

const ProtectedRoute = ({ scope = [], children }) => {
  const state = useSelector(state => state)
  let content = <></>
  if (getIsFinished(state, 'auth') && getIsAuthorizedUser(state, scope)) {
    content = <div>{children}</div>
  }
  if (getIsFinished(state, 'auth') && !getIsAuthorizedUser(state, scope)) {
    content = (
      <p>
        You need to{' '}
        <Link href="/auth">
          <a>login</a>
        </Link>{' '}
        to access this page.
      </p>
    )
  }
  return content
}

ProtectedRoute.propTypes = {
  scope: PropTypes.arrayOf(PropTypes.string).isRequired,
  children: PropTypes.element.isRequired,
}

export default ProtectedRoute
