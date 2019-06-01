import React from 'react'
import Link from 'next/link'
import { useGlobalState, getIsAuthorizedUser, getIsFinished } from '../store'

export default ({ scope = [], children }) => {
  const [state] = useGlobalState()
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
