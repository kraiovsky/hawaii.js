import React, { useEffect } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import { useGlobalState, refreshAccessToken } from '../store'
import { PROJECT_NAME } from '../constants'

export default ({ children }) => {
  const [{ pageTitle }, dispatch] = useGlobalState()
  useEffect(() => {
    refreshAccessToken(dispatch)
  }, [children])
  return (
    <>
      <Head>
        <title>
          {PROJECT_NAME} - {pageTitle}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  )
}
