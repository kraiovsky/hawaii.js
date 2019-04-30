import Link from 'next/link'
import { useGlobalState, logout } from '../store'

const NavBar = ({ isAuthenticated }) => {
  const [, dispatch] = useGlobalState()

  let authLink = isAuthenticated ? (
    <>
      <Link href="#">
        <a onClick={() => logout(dispatch)}>Log out</a>
      </Link>
    </>
  ) : (
    <>
      <Link href="/auth">
        <a>Login</a>
      </Link>
      {' | '}
      <Link href="/auth">
        <a>Signup</a>
      </Link>
    </>
  )

  let dashboardLink = isAuthenticated ? (
    <>
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
      {' | '}
    </>
  ) : (
    <></>
  )

  return (
    <>
      <div>
        <Link prefetch href="/">
          <a>Home</a>
        </Link>
        {' | '}
        {dashboardLink}
        {authLink}
      </div>
    </>
  )
}

export default NavBar
