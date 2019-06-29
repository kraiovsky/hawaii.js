import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setPageTitle } from '../store/actionCreators'

const pageTitle = 'your serverless starter kit'

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(setPageTitle(pageTitle))
  })
  return (
    <>
      <h2>Welcome to hawaii.js - your serverless starter kit ⚡</h2>
    </>
  )
}

export default Home
