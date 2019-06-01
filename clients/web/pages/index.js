import React, { useEffect } from 'react'
import { useGlobalState, setPageTitle } from '../store'

const pageTitle = 'your serverless starter kit'

const Home = () => {
  const [, dispatch] = useGlobalState()
  useEffect(() => {
    setPageTitle(pageTitle, dispatch)
  }, [])
  return (
    <>
      <h2>Welcome to hawaii.js - your serverless starter kit ⚡</h2>
    </>
  )
}

export default Home
