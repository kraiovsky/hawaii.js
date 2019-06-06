import React, { useEffect } from 'react'
import Head from 'next/head'
import NavBar from './NavBar'
import { useGlobalState, setOrRefreshAccessToken } from '../store'
import { PROJECT_NAME } from '../constants'

export default ({ children }) => {
  const [state, dispatch] = useGlobalState()

  useEffect(() => {
    setOrRefreshAccessToken(dispatch)
  }, [children])
  return (
    <>
      <Head>
        <title>
          {PROJECT_NAME} - {state.pageTitle}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  )
}
