import React from 'react'
import Link from 'next/link'

const Home = () => {
  return (
    <>
      <p>Welcome to next.js serverless ⚡</p>
      <Link href="/auth">
        <a>Authenticate</a>
      </Link>
    </>
  )
}

export default Home
