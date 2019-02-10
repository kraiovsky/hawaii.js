import Link from 'next/link'

export default () => (
  <>
    <div>
      <Link href="/">
        <a>Home</a>
      </Link>{' '}
      <Link href="/dashboard">
        <a>Dashboard</a>
      </Link>
    </div>
    <div>About page</div>
  </>
)
