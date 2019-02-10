import Link from 'next/link'

export default () => (
  <>
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <Link href="/dashboard/profile">
        <a>Profile</a>
      </Link>{' '}
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
    <div>Dashboard</div>
  </>
)
