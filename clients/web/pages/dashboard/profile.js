import React from 'react'
import Link from 'next/link'

export default class extends React.Component {
  static async getInitialProps({ req, query }) {
    const { paramA } = query || undefined
    return { paramA }
  }

  render() {
    return (
      <>
        <div>
          <Link href="/">
            <a>Home</a>
          </Link>{' '}
          <Link href="/dashboard">
            <a>Dashboard</a>
          </Link>{' '}
          <Link href="/about">
            <a>About</a>
          </Link>
        </div>
        <div>Profile page</div>
        <div>Param A: {this.props.paramA}</div>
      </>
    )
  }
}
