import React, { useEffect } from 'react'
import Head from 'next/head'
import PropTypes from 'prop-types'
import NavBar from './NavBar'
import { useGlobalState, setOrRefreshAccessToken } from '../store'
import { PROJECT_NAME } from '../constants'

const Wrapper = ({ children }) => {
  const [{ pageTitle }, dispatch] = useGlobalState()

  useEffect(() => {
    setOrRefreshAccessToken(dispatch)
  }, [children])
  return (
    <>
      <Head>
        <title>
          {PROJECT_NAME} - {pageTitle}
        </title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/ico" href="/static/favicon.ico" />
      </Head>
      <NavBar />
      <div>{children}</div>
    </>
  )
}

Wrapper.propTypes = {
  children: PropTypes.element.isRequired,
}

export default Wrapper
